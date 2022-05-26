import { createSlice } from "@reduxjs/toolkit";

const init = {
  showError: true,
  errorText: "",
  showSuccess: false,
  successText: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: init,
  reducers: {
    OPEN_ERROR_MODAL: (state) => {
      state.showError = true;
      return state;
    },
    OPEN_SUCCESS_MODAL: (state) => {
      state.showSuccess = true;
      return state;
    },
    CLOSE_ERROR_MODAL: (state) => {
      state.showError = false;
      return state;
    },
    CLOSE_SUCCESS_MODAL: (state) => {
      state.showSuccess = false;
      return state;
    },
    SET_ERROR_TEXT: (state, action) => {
      state.errorText = action.payload;
      return state;
    },
    SET_SUCCESS_TEXT: (state, action) => {
      state.successText = action.payload;
      return state;
    },
  },
  extraReducers: {},
});

export const {
  CLOSE_ERROR_MODAL,
  CLOSE_SUCCESS_MODAL,
  OPEN_ERROR_MODAL,
  OPEN_SUCCESS_MODAL,
  SET_ERROR_TEXT,
  SET_SUCCESS_TEXT,
} = modalSlice.actions;

export default modalSlice.reducer;
