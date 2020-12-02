import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { createTransaction, setTransactionsError, selectAllTransactions } from './transactionsSlice'
import { fetchUserInfo } from '../auth/authSlice'
import AutoCompleteUserList from '../../app/AutoCompleteUserList'

export const CreateTransactionForm = () => {
  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')  
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const idToken = useSelector((state) => state.auth.idToken)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const copyId = useSelector((state) => state.transactions.copyId)
  const transactions = useSelector(selectAllTransactions)

  const onAmountChanged = (e) => setAmount(e.target.value)

  useEffect(() => {
    if (currentUser && transactions) {
      const transactionToBeCopied = transactions.find((transaction) => transaction.id === Number(copyId))
      if (transactionToBeCopied) {
        setUsername(transactionToBeCopied.username)
        setAmount(transactionToBeCopied.amount * -1)
      }
    }
  }, [copyId, currentUser, transactions]);

  const canSave = 
   [username, amount].every(Boolean) && addRequestStatus === 'idle'

  const asyncGetUserInfo = async () => {
    if (idToken) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          fetchUserInfo()
        )        
        unwrapResult(resultAction)
        //console.log('Successfully fetched the user info: ', user_info)
      } catch (err) {
        //console.error('Failed to fetch the user info: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const onCreateTransactionClicked = async (e) => {    
    e.preventDefault(); // https://stackoverflow.com/a/50193256

    if (amount === '') {
      dispatch(setTransactionsError('The amount is empty.'))
      return
    }
  
    if (amount > currentUser.balance) {
      dispatch(setTransactionsError('The amount is bigger than the balance.'))
      return
    }

    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          createTransaction({ name: username, amount })
        )        
        unwrapResult(resultAction)
        // console.log('Successfully created a transaction: ', created_transaction)
        setUsername('')
        setAmount('')
        asyncGetUserInfo()
      } catch (err) {
        // console.error('Failed to create a transaction: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <div className="col-md-8">
      <h4 className="mb-3">Create a New Transaction</h4>
      <form className="needs-validation" noValidate="">
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="userName">Name</label>
            <AutoCompleteUserList
              onChange={setUsername}
              username={username}
              copyId={copyId}
            />
          </div>
          <div className="col-md-4">            
            <label htmlFor="userAmount">Amount</label>
            <input
              type="text"
              className="form-control"
              id="userAmount"
              name="userAmount"
              placeholder="Input transaction amount"
              required=""
              value={amount}
              onChange={onAmountChanged}
            />
            <div className="invalid-feedback">
              Amount exceeds balance.
            </div>
          </div>
        </div>
        <hr className="mb-4"/>        
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={onCreateTransactionClicked} disabled={!canSave}>
          Create Transaction
        </button>
      </form>
    </div>    
  )
}
