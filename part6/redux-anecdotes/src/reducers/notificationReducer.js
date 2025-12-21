import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setValue(state, action) {
      return action.payload
    },
    resetNotification() {
      return ''
    }
  }
})

const { setValue, resetNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(setValue(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000);
  }
}

export default notificationSlice.reducer
