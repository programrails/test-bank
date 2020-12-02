import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetAuthError } from '../features/auth/authSlice'
import { resetTransactionsError } from '../features/transactions/transactionsSlice'
import { resetUserError } from '../features/users/usersSlice'
import { nanoid } from '@reduxjs/toolkit'

import {
  useLocation,
} from 'react-router-dom'

export const ErrorFlash = props => {

  const dispatch = useDispatch()
  const location = useLocation()

  const redirect_error = localStorage.getItem('test-bank/redirect_error')

  const auth_error = useSelector((state) => state.auth.error)
  const transactions_error = useSelector((state) => state.transactions.error)
  const users_error = useSelector((state) => state.users.error)

  let error_messages = auth_error.concat(transactions_error).concat(users_error)  

  if (redirect_error) error_messages.push(redirect_error)  

  useEffect(() => {    
    if (auth_error.length) dispatch(resetAuthError())
    if (transactions_error.length) dispatch(resetTransactionsError())
    if (users_error.length) dispatch(resetUserError())

    if (redirect_error) localStorage.removeItem('test-bank/redirect_error')

  //}, [location, auth_error.length, transactions_error.length, users_error.length, dispatch])      
  }, [location, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  let rendered_errors = error_messages.map((elem) => {
    return (
      <div key={nanoid()} className='alert alert-danger' role='alert'>
        {elem}
      </div>
    )
  })

  return (
    <React.Fragment>
      {rendered_errors}
    </React.Fragment>
  )
}
