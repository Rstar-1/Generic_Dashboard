import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

/**
 * Universal Creator Info Normalizer
 */
export const normalizeCreator = (createdBy, createdby) => {
  const obj =
    typeof createdBy === "object" && createdBy !== null
      ? createdBy
      : typeof createdby === "object" && createdby !== null
      ? createdby
      : {};

  const creatorId =
    obj._id ||
    obj.id ||
    (typeof createdBy === "string" ? createdBy : "") ||
    (typeof createdby === "string" && createdby.match(/^[0-9a-fA-F]{24}$/) ? createdby : "");

  let name =
    obj.fullname ||
    obj.name ||
    (typeof createdby === "string" && !createdby.match(/^[0-9a-fA-F]{24}$/) ? createdby : "") ||
    (typeof createdBy === "string" && !createdBy.match(/^[0-9a-fA-F]{24}$/) ? createdBy : "");

  let mobile = obj.mobile || obj.phone || "";
  let email = obj.email || "";
  let role = obj.role || obj.rolename || "";
  let avatar = obj.image || obj.avatar || obj.profileImage || obj.photo || "";

  // 1. Check current logged-in user in localStorage
  try {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    const storedId = stored._id || stored.id || stored.userId;
    const matchesUser =
      (storedId && (String(storedId) === String(creatorId) || String(stored._id) === String(creatorId))) ||
      (!creatorId && stored.fullname) ||
      (name && stored.fullname && name.toLowerCase() === stored.fullname.toLowerCase()) ||
      (mobile && stored.mobile && mobile === stored.mobile);

    if (matchesUser) {
      if (!name || name === "Admin") name = stored.fullname || stored.name || name;
      if (!mobile) mobile = stored.mobile || stored.phone || mobile;
      if (!email) email = stored.email || email;
      if (!role) role = stored.role || stored.rolename || role;
      if (!avatar) avatar = stored.image || stored.avatar || stored.profileImage || "";
    }
  } catch {}

  // 2. Check cachedUsers in localStorage for other users & roles
  if ((!avatar || !name || name === "Admin") && creatorId) {
    try {
      const rawUsers = localStorage.getItem("cachedUsers") || localStorage.getItem("users");
      if (rawUsers) {
        const uList = JSON.parse(rawUsers);
        if (Array.isArray(uList)) {
          const found = uList.find(
            (u) =>
              String(u._id) === String(creatorId) ||
              String(u.id) === String(creatorId) ||
              (mobile && u.mobile && u.mobile === mobile) ||
              (email && u.email && u.email.toLowerCase() === email.toLowerCase())
          );
          if (found) {
            if (!name || name === "Admin") name = found.fullname || found.name || name;
            if (!mobile) mobile = found.mobile || found.phone || mobile;
            if (!email) email = found.email || email;
            if (!role) role = found.role || found.rolename || role;
            if (!avatar) avatar = found.image || found.avatar || found.profileImage || "";
          }
        }
      }
    } catch {}
  }

  if (!name) name = "Admin";
  const subText = mobile || email || "";

  return {
    _id: creatorId,
    id: creatorId,
    fullname: name,
    name,
    mobile: subText,
    phone: subText,
    email,
    role,
    avatar,
    image: avatar,
    toString() {
      return name;
    },
    valueOf() {
      return name;
    },
  };
};

/**
 * Universal Pagination & List Payload Parser
 */
export const parsePaginationPayload = (
  res,
  params = {},
  itemKey = "items",
  normalizer = (x) => x
) => {
  const payload = res?.data !== undefined ? res.data : res;
  let list = [];
  let total = 0;
  let page = Number(params.page) || 1;
  let limit = Number(params.limit) || 10;
  let totalPages = 1;

  if (Array.isArray(payload)) {
    list = payload;
    total = payload.length;
    totalPages = Math.ceil(total / limit) || 1;
  } else if (payload && typeof payload === "object") {
    list = Array.isArray(payload[itemKey])
      ? payload[itemKey]
      : Array.isArray(payload.data)
      ? payload.data
      : Array.isArray(payload.list)
      ? payload.list
      : [];
    total = Number(payload.total ?? payload.pagination?.total ?? list.length);
    page = Number(payload.page ?? payload.pagination?.page ?? page);
    limit = Number(payload.limit ?? payload.pagination?.limit ?? limit);
    totalPages = Number(
      payload.totalPages ??
        payload.pagination?.totalPages ??
        (Math.ceil(total / limit) || 1)
    );
  }

  const counts = payload?.counts || payload?.pagination?.counts || null;

  return {
    [itemKey]: list.map(normalizer),
    total,
    page,
    limit,
    totalPages,
    pagination: { total, page, limit, totalPages },
    counts,
  };
};

/**
 * Universal Entity Slice Generator
 * Automatically creates standardized:
 * - Async Thunks (fetch, fetchById, create, update, delete, bulkDelete)
 * - Initial state & slice reducers
 * - Selectors (items, loading, error, total, page, limit, pagination)
 * - Custom React Hook with bound dispatches
 */
export const createEntitySlice = ({
  name,
  itemKey = "items",
  singular = "item",
  plural = itemKey,
  api = {},
  normalizer = (x) => x,
  extraReducers: customExtraReducers = () => {},
  initialState: customInitialState = {},
  customHookMethods = {},
}) => {
  const capPlural = cap(plural);
  const capSingular = cap(singular);
  const capItemKey = cap(itemKey);

  // Standard Async Thunks
  const fetchThunk = createAsyncThunk(
    `${name}/fetch${capPlural}`,
    async (params = {}, { rejectWithValue }) => {
      try {
        const res = await api.getAll(params);
        return parsePaginationPayload(res, params, itemKey, normalizer);
      } catch (err) {
        if (err?.isCanceled || err?.name === "CanceledError") {
          return rejectWithValue({ isCanceled: true });
        }
        return rejectWithValue(err.message || `Failed to fetch ${plural}`);
      }
    },
    {
      condition: (params, { getState }) => {
        const sliceState = getState()?.[name];
        const paramStr = JSON.stringify(params || {});
        if (sliceState?.loading && sliceState?.currentParams === paramStr) {
          return false; // Skip duplicate concurrent dispatch
        }
        return true;
      },
    }
  );

  const fetchByIdThunk = createAsyncThunk(
    `${name}/fetch${capSingular}ById`,
    async (id, { rejectWithValue }) => {
      try {
        const res = await api.getById(id);
        return normalizer(res?.data !== undefined ? res.data : res);
      } catch (err) {
        return rejectWithValue(err.message || `Failed to fetch ${singular}`);
      }
    }
  );

  const createThunk = createAsyncThunk(
    `${name}/create${capSingular}`,
    async (data, { rejectWithValue }) => {
      try {
        const res = await api.create(data);
        return normalizer(res?.data !== undefined ? res.data : res);
      } catch (err) {
        return rejectWithValue(err.message || `Failed to create ${singular}`);
      }
    }
  );

  const updateThunk = createAsyncThunk(
    `${name}/update${capSingular}`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const res = await api.update(id, data);
        return normalizer(res?.data !== undefined ? res.data : res);
      } catch (err) {
        return rejectWithValue(err.message || `Failed to update ${singular}`);
      }
    }
  );

  const deleteThunk = createAsyncThunk(
    `${name}/delete${capSingular}`,
    async (id, { rejectWithValue }) => {
      try {
        await api.delete(id);
        return id;
      } catch (err) {
        return rejectWithValue(err.message || `Failed to delete ${singular}`);
      }
    }
  );

  const bulkDeleteThunk = createAsyncThunk(
    `${name}/bulkDelete${capPlural}`,
    async (data, { rejectWithValue }) => {
      try {
        const res = await api.bulkDelete(data);
        const ids = Array.isArray(data)
          ? data
          : Array.isArray(data?.ids)
          ? data.ids
          : data?.categoryIds || data?.productIds || data?.blogIds || [];
        return { ids, res };
      } catch (err) {
        return rejectWithValue(err.message || `Failed to bulk delete ${plural}`);
      }
    }
  );

  const thunks = {
    [`fetch${capPlural}`]: fetchThunk,
    [`fetch${capSingular}ById`]: fetchByIdThunk,
    [`create${capSingular}`]: createThunk,
    [`update${capSingular}`]: updateThunk,
    [`delete${capSingular}`]: deleteThunk,
    [`bulkDelete${capPlural}`]: bulkDeleteThunk,
  };

  const initialState = {
    [itemKey]: [],
    currentItem: null,
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    pagination: null,
    counts: null,
    loading: false,
    error: null,
    ...customInitialState,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
      setCurrentItem: (state, action) => {
        state.currentItem = action.payload;
      },
      setItemsDirectly: (state, action) => {
        state[itemKey] = Array.isArray(action.payload)
          ? action.payload.map(normalizer)
          : [];
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch
        .addCase(fetchThunk.pending, (state, action) => {
          state.loading = true;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
          state.currentParams = JSON.stringify(action.meta.arg || {});
        })
        .addCase(fetchThunk.fulfilled, (state, action) => {
          if (state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentParams = null;
            state[itemKey] = action.payload[itemKey];
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.totalPages = action.payload.totalPages;
            state.pagination = action.payload.pagination;
            if (action.payload.counts) state.counts = action.payload.counts;
          }
        })
        .addCase(fetchThunk.rejected, (state, action) => {
          if (state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentParams = null;
            if (!action.payload?.isCanceled) {
              state.error = action.payload;
            }
          }
        })

        // Create
        .addCase(createThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createThunk.fulfilled, (state, action) => {
          state.loading = false;
          const newItem = action.payload;
          const idx = state[itemKey].findIndex(
            (i) => i.id === newItem.id || (newItem._id && i._id === newItem._id)
          );
          if (idx !== -1) {
            state[itemKey][idx] = newItem;
          } else {
            state[itemKey].unshift(newItem);
            state.total += 1;
          }
        })
        .addCase(createThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Update
        .addCase(updateThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateThunk.fulfilled, (state, action) => {
          state.loading = false;
          const updated = action.payload;
          const idx = state[itemKey].findIndex(
            (i) => i.id === updated.id || (updated._id && i._id === updated._id)
          );
          if (idx !== -1) state[itemKey][idx] = updated;
          if (
            state.currentItem &&
            (state.currentItem.id === updated.id ||
              state.currentItem._id === updated._id)
          ) {
            state.currentItem = updated;
          }
        })
        .addCase(updateThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Delete
        .addCase(deleteThunk.fulfilled, (state, action) => {
          const id = action.payload;
          const idx = state[itemKey].findIndex(
            (i) => i.id === id || i._id === id
          );
          if (idx !== -1) {
            if (state[itemKey][idx].isDeleted) {
              state[itemKey].splice(idx, 1);
              state.total = Math.max(0, state.total - 1);
            } else {
              state[itemKey][idx].isDeleted = true;
            }
          }
        })

        // Bulk Delete
        .addCase(bulkDeleteThunk.fulfilled, (state, action) => {
          const idSet = new Set((action.payload.ids || []).map(String));
          state[itemKey] = state[itemKey]
            .filter(
              (i) =>
                !(
                  i.isDeleted &&
                  (idSet.has(String(i.id)) || idSet.has(String(i._id)))
                )
            )
            .map((i) =>
              idSet.has(String(i.id)) || idSet.has(String(i._id))
                ? { ...i, isDeleted: true }
                : i
            );
        });

      customExtraReducers(builder, thunks);
    },
  });

  // Selectors
  const selectors = {
    [`select${capItemKey}`]: (state) => state[name]?.[itemKey] || [],
    [`select${capItemKey}Loading`]: (state) => Boolean(state[name]?.loading),
    [`select${capItemKey}Error`]: (state) => state[name]?.error || null,
    [`select${capItemKey}Total`]: (state) => state[name]?.total || 0,
    [`select${capItemKey}Page`]: (state) => state[name]?.page || 1,
    [`select${capItemKey}Limit`]: (state) => state[name]?.limit || 10,
    [`select${capItemKey}TotalPages`]: (state) => state[name]?.totalPages || 1,
    [`select${capItemKey}Pagination`]: (state) =>
      state[name]?.pagination || null,
    [`select${capItemKey}Counts`]: (state) =>
      state[name]?.counts || null,
    [`selectCurrent${capSingular}`]: (state) =>
      state[name]?.currentItem || null,
  };

  // Custom Hook
  const useHook = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectors[`select${capItemKey}`]);
    const loading = useSelector(selectors[`select${capItemKey}Loading`]);
    const error = useSelector(selectors[`select${capItemKey}Error`]);
    const total = useSelector(selectors[`select${capItemKey}Total`]);
    const page = useSelector(selectors[`select${capItemKey}Page`]);
    const limit = useSelector(selectors[`select${capItemKey}Limit`]);
    const totalPages = useSelector(selectors[`select${capItemKey}TotalPages`]);
    const pagination = useSelector(selectors[`select${capItemKey}Pagination`]);
    const counts = useSelector(selectors[`select${capItemKey}Counts`]);

    return {
      [itemKey]: items,
      loading,
      error,
      total,
      page,
      limit,
      totalPages,
      pagination,
      counts,
      statusCounts: counts,
      [`get${capPlural}`]: React.useCallback(
        (p) => dispatch(fetchThunk(p)),
        [dispatch]
      ),
      [`fetch${capPlural}`]: React.useCallback(
        (p) => dispatch(fetchThunk(p)),
        [dispatch]
      ),
      [`add${capSingular}`]: React.useCallback(
        (d) => dispatch(createThunk(d)),
        [dispatch]
      ),
      [`create${capSingular}`]: React.useCallback(
        (d) => dispatch(createThunk(d)),
        [dispatch]
      ),
      [`edit${capSingular}`]: React.useCallback(
        (id, d) => dispatch(updateThunk({ id, data: d })),
        [dispatch]
      ),
      [`update${capSingular}`]: React.useCallback(
        (id, d) => dispatch(updateThunk({ id, data: d })),
        [dispatch]
      ),
      [`remove${capSingular}`]: React.useCallback(
        (id) => dispatch(deleteThunk(id)),
        [dispatch]
      ),
      [`delete${capSingular}`]: React.useCallback(
        (id) => dispatch(deleteThunk(id)),
        [dispatch]
      ),
      [`bulkRemove${capPlural}`]: React.useCallback(
        (d) => dispatch(bulkDeleteThunk(d)),
        [dispatch]
      ),
      [`bulkDelete${capPlural}`]: React.useCallback(
        (d) => dispatch(bulkDeleteThunk(d)),
        [dispatch]
      ),
      dispatch,
      ...Object.fromEntries(
        Object.entries(customHookMethods).map(([k, fn]) => [k, fn(dispatch)])
      ),
    };
  };

  return {
    slice,
    reducer: slice.reducer,
    actions: slice.actions,
    thunks,
    selectors,
    useHook,
  };
};
