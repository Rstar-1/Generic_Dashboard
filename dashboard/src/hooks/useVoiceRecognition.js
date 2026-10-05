import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { setIsListening, setTranscript } from "../store/slices/botSlice";

/**
 * Custom hook wrapping react-speech-recognition with Redux synchronization
 */
export const useVoiceRecognition = () => {
  const dispatch = useDispatch();
  const reduxListening = useSelector((state) => state.bot.isListening);
  const reduxTranscript = useSelector((state) => state.bot.transcript);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Keep Redux in sync with speech recognition listening state
  useEffect(() => {
    dispatch(setIsListening(listening));
  }, [listening, dispatch]);

  // Keep Redux transcript in sync
  useEffect(() => {
    dispatch(setTranscript(transcript));
  }, [transcript, dispatch]);

  const handleResetTranscript = useCallback(() => {
    resetTranscript();
    dispatch(setTranscript(""));
  }, [resetTranscript, dispatch]);

  const startListening = useCallback(
    (options = {}) => {
      if (!browserSupportsSpeechRecognition) {
        console.warn("Speech recognition is not supported in this browser.");
        return;
      }
      handleResetTranscript();
      dispatch(setIsListening(true));
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
        ...options,
      });
    },
    [browserSupportsSpeechRecognition, handleResetTranscript, dispatch]
  );

  const abortListening = useCallback(() => {
    try {
      SpeechRecognition.abortListening();
    } catch (e) {
      console.warn("Error aborting speech recognition:", e);
    }
    handleResetTranscript();
    dispatch(setIsListening(false));
  }, [handleResetTranscript, dispatch]);

  const stopListening = useCallback(() => {
    try {
      SpeechRecognition.stopListening();
    } catch (e) {
      console.warn("Error stopping speech recognition:", e);
    }
    dispatch(setIsListening(false));
  }, [dispatch]);

  const toggleListening = useCallback(() => {
    if (listening || reduxListening) {
      abortListening();
    } else {
      startListening();
    }
  }, [listening, reduxListening, startListening, abortListening]);

  return {
    transcript,
    listening: Boolean(listening || reduxListening),
    startListening,
    stopListening,
    abortListening,
    toggleListening,
    resetTranscript: handleResetTranscript,
    isSupported: browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  };
};

export default useVoiceRecognition;
