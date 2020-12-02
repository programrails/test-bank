import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const transactionsAdapter = createEntityAdapter()

const initialState = transactionsAdapter.getInitialState({
  copyId: null,
  status: 'idle',
  error: [],
})

export const listTransactions = createAsyncThunk(
  'transactions/listTransactions',
  async (_, { getState }) => {

    // Here we should take the secret token from the Redux state rather than from the local storage
    // The secret token is stored in the local storage only for the inter-session restorations.
    const idToken = getState().auth.idToken

    const response = await client.auth_get('api/protected/transactions', idToken)

    // The server is not always responding with JSON (sometimes in plain text).
    // In this case it does.
    const responseJson = JSON.parse(response)

    const transactions = responseJson['trans_token']

    return transactions
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionAttributes, { getState }) => {

    // Here we should take the secret token from the Redux state rather than from the local storage
    // The secret token is stored in the local storage only for the inter-session restorations.
    const idToken = getState().auth.idToken

    const response = await client.auth_post('api/protected/transactions', transactionAttributes, idToken)

    // The server is not always responding with JSON (sometimes in plain text).
    // In this case it does.
    const responseJson = JSON.parse(response)

    const transaction = responseJson['trans_token']

    return transaction
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    copyId(state, action) {
    state.copyId = action.payload
    },
    setTransactionsError(state, action) {
    state.error.push(action.payload)
    },
    resetTransactionsError(state, action) {
    state.error = []
    },
    clearTransactions(state, action) {      
    transactionsAdapter.removeMany(state, state.ids)
    },    
  },
  extraReducers: {
    [listTransactions.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
    },
    [listTransactions.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      transactionsAdapter.upsertMany(state, action.payload)
      state.error = []
    },
    [listTransactions.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
    },
    [createTransaction.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
    },
    [createTransaction.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      transactionsAdapter.addOne(state, action.payload)
      state.error = []
    },
    [createTransaction.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
    },    
  },
})

export const { copyId, setTransactionsError, resetTransactionsError, clearTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllTransactions,
  // Pass in a selector that returns the transactions slice of state
} = transactionsAdapter.getSelectors(state => state.transactions)
