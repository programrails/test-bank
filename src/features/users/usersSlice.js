import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {  
  idTokens: [],
  status: 'idle',
  error: [],
}

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userAttributes) => {
    const response = await client.post('users', userAttributes)

    // The server is not always responding with JSON (sometimes in plain text).
    // In this case it does.
    const responseJson = JSON.parse(response)
    const idToken = responseJson['id_token']
    return idToken
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserError(state, action) {
    state.error = []
    },    
    resetUserError(state, action) {
    state.error = []
    },
  },
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
    },
    [createUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.idTokens.push(action.payload)
      state.error = []
    },
    [createUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
    },    
  },
})

export const { setUserError, resetUserError } = usersSlice.actions

export default usersSlice.reducer
