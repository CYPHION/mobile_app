import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "..";
import { API } from "../../network/API";


export const logoutUser = createAsyncThunk("logoutUser", () => {
      const state = store.getState()

      return new Promise((resolve, reject) => {
            if (state?.user?.data?.email) {
                  resolve()
            }
      })

});

export const globalData = createAsyncThunk("globalData", async (id) => {
      const res = await API.getGlobalData(id)
      return res.data
});
