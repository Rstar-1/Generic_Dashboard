import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkDomainApi, checkMultipleDomainsApi } from "../api/endpoints/domainApi.js";

const loadStarredDomains = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return JSON.parse(localStorage.getItem("domain_starred") || "[]");
    }
  } catch {}
  return [];
};

const saveStarredDomains = (list) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("domain_starred", JSON.stringify(list));
    }
  } catch {}
};

export const checkDomain = createAsyncThunk(
  "domain/checkDomain",
  async (domain, { rejectWithValue }) => {
    try {
      return await checkDomainApi(domain);
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to check domain");
    }
  }
);

export const checkBatchDomains = createAsyncThunk(
  "domain/checkBatchDomains",
  async (domains = [], { rejectWithValue }) => {
    try {
      return await checkMultipleDomainsApi(domains, 4);
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to batch check domains");
    }
  }
);

const initialState = {
  searchQuery: "",
  domainResults: {},
  loadingDomains: {},
  isBatchChecking: false,
  starredDomains: loadStarredDomains(),
  error: null,
};

export const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload || "";
    },
    toggleStarDomain: (state, action) => {
      const domain = action.payload;
      if (!domain) return;
      const index = state.starredDomains.indexOf(domain);
      if (index >= 0) state.starredDomains.splice(index, 1);
      else state.starredDomains.push(domain);
      saveStarredDomains(state.starredDomains);
    },
    setDomainStatus: (state, action) => {
      const { domain, status, message } = action.payload || {};
      if (domain) state.domainResults[domain] = { domain, status, message };
    },
    clearDomainResults: (state) => {
      state.domainResults = {};
      state.loadingDomains = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkDomain.pending, (state, action) => {
        if (action.meta.arg) state.loadingDomains[action.meta.arg] = true;
      })
      .addCase(checkDomain.fulfilled, (state, action) => {
        const result = action.payload;
        if (result?.domain) {
          state.domainResults[result.domain] = result;
          delete state.loadingDomains[result.domain];
        }
      })
      .addCase(checkDomain.rejected, (state, action) => {
        const domain = action.meta.arg;
        if (domain) {
          delete state.loadingDomains[domain];
          state.domainResults[domain] = { domain, status: "unknown", message: action.payload || "Check failed" };
        }
      })
      .addCase(checkBatchDomains.pending, (state, action) => {
        state.isBatchChecking = true;
        (action.meta.arg || []).forEach((d) => { state.loadingDomains[d] = true; });
      })
      .addCase(checkBatchDomains.fulfilled, (state, action) => {
        state.isBatchChecking = false;
        Object.entries(action.payload || {}).forEach(([domain, res]) => {
          state.domainResults[domain] = res;
          delete state.loadingDomains[domain];
        });
      })
      .addCase(checkBatchDomains.rejected, (state, action) => {
        state.isBatchChecking = false;
        (action.meta.arg || []).forEach((d) => { delete state.loadingDomains[d]; });
        state.error = action.payload || "Batch checking failed";
      });
  },
});

export const { setSearchQuery, toggleStarDomain, setDomainStatus, clearDomainResults } = domainSlice.actions;

export const selectSearchQuery = (state) => state.domain?.searchQuery || "";
export const selectDomainResults = (state) => state.domain?.domainResults || {};
export const selectLoadingDomains = (state) => state.domain?.loadingDomains || {};
export const selectIsBatchChecking = (state) => Boolean(state.domain?.isBatchChecking);
export const selectStarredDomains = (state) => state.domain?.starredDomains || [];
export const selectDomainError = (state) => state.domain?.error || null;

export const useDomain = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const domainResults = useSelector(selectDomainResults);
  const loadingDomains = useSelector(selectLoadingDomains);
  const isBatchChecking = useSelector(selectIsBatchChecking);
  const starredDomains = useSelector(selectStarredDomains);
  const error = useSelector(selectDomainError);

  return {
    searchQuery,
    domainResults,
    loadingDomains,
    isBatchChecking,
    starredDomains,
    error,
    checkDomain: React.useCallback((d) => dispatch(checkDomain(d)), [dispatch]),
    checkBatchDomains: React.useCallback((ds) => dispatch(checkBatchDomains(ds)), [dispatch]),
    setSearchQuery: React.useCallback((q) => dispatch(setSearchQuery(q)), [dispatch]),
    toggleStarDomain: React.useCallback((d) => dispatch(toggleStarDomain(d)), [dispatch]),
    clearDomainResults: React.useCallback(() => dispatch(clearDomainResults()), [dispatch]),
    dispatch,
  };
};

export default domainSlice.reducer;
