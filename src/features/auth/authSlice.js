import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  idToken: null,//has to be separate because it is fetched and locally stored separately
  currentUser: null,
  status: 'idle',
  error: [],
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userAttributes) => {

    const response = await client.post('sessions/create', userAttributes)
    
    // The server is not always responding with JSON (sometimes in plain text).
    // In this case it does.
    const responseJson = JSON.parse(response)

    const idToken = responseJson['id_token']

    return idToken
  }
)

export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { getState }) => {

    // Here we should take the secret token from the Redux state rather than from the local storage
    // The secret token is stored in the local storage only for the inter-session restorations.
    const idToken = getState().auth.idToken

    const response = await client.auth_get('api/protected/user-info', idToken)
    
    // The server is not always responding with JSON (sometimes in plain text).
    // In this case it does.
    const responseJson = JSON.parse(response)

    const {id, name, email, balance} = responseJson['user_info_token']

    const user = {id, username: name, email, balance}

    return user
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.idToken = null
      state.currentUser = null
      state.status = 'idle'
      state.error = []
      state.balance = null
    },  
    restoreIdToken(state, action) {
      state.idToken = action.payload
      state.status = 'idle'
      state.error = []
    },
    setAuthError(state, action) {
    state.error.push(action.payload)
    },    
    resetAuthError(state, action) {
    state.error = []
    },
  },  
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = 'loading'
      state.idToken = null
      state.error = []
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.idToken = action.payload
      state.error = []
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.idToken = null
      state.error.push(action.error.message)
    },
    [fetchUserInfo.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload
      state.error = []
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
    },    
  },
})

export const { logoutUser, restoreIdToken, setAuthError, resetAuthError } = authSlice.actions

export default authSlice.reducer
