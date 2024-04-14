// Import necessary functions from Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from ".."; // Importing the Redux store
import { API } from "../../network/API"; // Importing API utility for network requests

// Async thunk for logging out user
export const logoutUser = createAsyncThunk("logoutUser", () => {
  // Accessing the current Redux store state
  const state = store.getState();

  // Returning a promise to handle async behavior
  return new Promise((resolve, reject) => {
    // Checking if user data exists in the current state
    if (state?.user?.data?.email) {
      resolve(); // Resolving the promise if user data exists
    }
    // No user data found, the promise remains pending
  });
});

// Async thunk for fetching global data
export const globalData = createAsyncThunk("globalData", async (id) => {
  // Making an asynchronous network request to fetch global data
  const res = await API.getGlobalData(id);
  return res.data; // Returning the fetched global data
});
