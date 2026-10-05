import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendChatMessage, fetchAIModels, checkHealth, speechSynth } from "../../services/aiChatService";

export const checkBackendConnection = createAsyncThunk(
  "bot/checkBackendConnection",
  async (_, { rejectWithValue }) => {
    try {
      const res = await checkHealth();
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAvailableModels = createAsyncThunk(
  "bot/getAvailableModels",
  async (_, { rejectWithValue }) => {
    try {
      const models = await fetchAIModels();
      return models;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "bot/sendMessage",
  async ({ content, modelOverride }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState().bot;
      const model = modelOverride || state.currentModel || "gemini-2.5-flash";

      const userMsg = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // History including this new message
      const conversationHistory = [...state.messages, userMsg];

      // Dispatch optimistic message addition
      dispatch(botSlice.actions.addMessage(userMsg));

      const response = await sendChatMessage({
        messages: conversationHistory,
        model,
        maxTokens: 8192,
      });

      const assistantMsg = {
        id: response.id || `bot-${Date.now()}`,
        role: "assistant",
        content: response.message?.content || "No response received.",
        model: response.model || model,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // If TTS enabled, speak the answer
      if (state.ttsEnabled && assistantMsg.content) {
        dispatch(botSlice.actions.setIsPlayingSpeech(true));
        speechSynth.speak(assistantMsg.content, {
          onStart: () => dispatch(botSlice.actions.setIsPlayingSpeech(true)),
          onEnd: () => dispatch(botSlice.actions.setIsPlayingSpeech(false)),
          onError: () => dispatch(botSlice.actions.setIsPlayingSpeech(false)),
        });
      }

      return assistantMsg;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to communicate with AI Service");
    }
  }
);

const initialWelcomeTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const initialState = {
  isChat: false,
  messages: [
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Greetings, Commander. Barasingha AI Core v1.0 is initialized and operational with Google Gemini (gemini-2.5-flash). Voice synthesis, microphone speech recognition, and neural command links are online. How may I assist your mission today?",
      timestamp: initialWelcomeTime,
      model: "gemini-2.5-flash",
    },
  ],
  loading: false,
  error: null,
  currentModel: "gemini-2.5-flash",
  availableModels: [
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Google)", provider: "gemini" },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (Google)", provider: "gemini" },
    { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash (Google)", provider: "gemini" },
    { id: "grok-beta", name: "Grok Beta (xAI)", provider: "xai" },
    { id: "grok-2-latest", name: "Grok 2 Latest (xAI)", provider: "xai" },
  ],
  backendStatus: "checking", // 'checking' | 'healthy' | 'offline'
  isListening: false,
  transcript: "",
  ttsEnabled: true,
  isPlayingSpeech: false,
};

export const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    toggleChatMode: (state) => {
      state.isChat = !state.isChat;
    },
    setIsChat: (state, action) => {
      state.isChat = Boolean(action.payload);
    },
    setCurrentModel: (state, action) => {
      state.currentModel = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      speechSynth.stop();
      state.isPlayingSpeech = false;
      state.messages = [
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: "Chat cleared. Grok neural core is ready for new instructions, Commander.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          model: state.currentModel,
        },
      ];
      state.error = null;
    },
    setIsListening: (state, action) => {
      state.isListening = action.payload;
    },
    setTranscript: (state, action) => {
      state.transcript = action.payload;
    },
    toggleTts: (state) => {
      state.ttsEnabled = !state.ttsEnabled;
      if (!state.ttsEnabled) {
        speechSynth.stop();
        state.isPlayingSpeech = false;
      }
    },
    setIsPlayingSpeech: (state, action) => {
      state.isPlayingSpeech = action.payload;
    },
    stopSpeech: (state) => {
      speechSynth.stop();
      state.isPlayingSpeech = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Health check
      .addCase(checkBackendConnection.fulfilled, (state, action) => {
        state.backendStatus = action.payload?.connected ? "healthy" : "offline";
      })
      .addCase(checkBackendConnection.rejected, (state) => {
        state.backendStatus = "offline";
      })
      // Available models
      .addCase(getAvailableModels.fulfilled, (state, action) => {
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.availableModels = action.payload;
          if (!action.payload.some((m) => m.id === state.currentModel)) {
            state.currentModel = action.payload[0].id;
          }
        }
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isListening = false;
        state.transcript = "";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.push({
          id: `error-${Date.now()}`,
          role: "assistant",
          content: `⚠️ [Grok AI Service Error]: ${action.payload}. Please ensure Bot Backend is running at http://localhost:8000.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        });
      });
  },
});

export const {
  toggleChatMode,
  setIsChat,
  setCurrentModel,
  addMessage,
  clearChat,
  setIsListening,
  setTranscript,
  toggleTts,
  setIsPlayingSpeech,
  stopSpeech,
} = botSlice.actions;

export default botSlice.reducer;
