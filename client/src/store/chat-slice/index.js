import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  query: [],
  file: [],
  results: [],
  loading: false,
  error: null,
};

// Async thunk to upload a file
export const upload_file = createAsyncThunk(
  "messages/upload_file",
  async (file) => {
    const formData = new FormData();
    formData.append("my_file", file);

    const response = await axios.post(
      `http://localhost:8000/api/data/upload-files`,
      formData,
    );
    return response.data;
  }
);

// Async thunk to add a new message
export const add_message = createAsyncThunk(
  "messages/add_message",
  async ({ userId, query, file }) => {
    const response = await axios.post(
      `http://localhost:8000/api/data/add-message/${userId}`,
      {
        query,
        file,
      }
    );
    return response.data;
  }
);

// Async thunk to fetch all messages
export const fetch_all_messages = createAsyncThunk(
  "messages/fetch_all_messages",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/data/fetch-all-messages/${userId}`
    );
    return response.data;
  }
);

// Async thunk to delete all messages
export const delete_all_messages = createAsyncThunk(
  "messages/delete_all_messages",
  async (userId) => {
    const response = await axios.delete(
      `http://localhost:8000/api/data/delete-all-messages/${userId}`
    );
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upload_file.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upload_file.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(upload_file.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(add_message.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(add_message.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(add_message.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetch_all_messages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_all_messages.fulfilled, (state, action) => {
        state.loading = false;
        state.query = action.payload.query;
        state.file = action.payload.file;
        state.results = action.payload.results;
      })
      .addCase(fetch_all_messages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_all_messages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delete_all_messages.fulfilled, (state) => {
        state.loading = false;
        state.query = [];
        state.file = [];
        state.results = [];
      })
      .addCase(delete_all_messages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messagesSlice.reducer;
