import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { createUser } from './usersSlice'

import { setAuthError } from '../auth/authSlice'

export const CreateUserForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onPassword2Changed = (e) => setPassword2(e.target.value)

  const canSave = 
   [username, email, password, password2].every(Boolean) && addRequestStatus === 'idle'

  const onCreateUserClicked = async (e) => {
    e.preventDefault(); // https://stackoverflow.com/a/50193256

    if (password !== password2) {
      dispatch(setAuthError('Password re-type does not match.'))
      return
    }

    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          createUser({ username, email, password })
        )
        unwrapResult(resultAction)
        setUsername('')
        setEmail('')
        setPassword('')
        setPassword2('')

        // console.log('Successfully created a user: ', res)
      } catch (err) {        
        // console.error('Failed to create a user: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <div className="col-md-8">
      <h4 className="mb-3">Create a New User</h4>
      <form className="needs-validation" noValidate="">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="Input username"
              required=""
              value={username}
              onChange={onUsernameChanged}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="userEmail">Email</label>
            <input
              type="text"
              className="form-control"
              id="userEmail"
              name="userEmail"
              placeholder="Input user email"
              required=""
              value={email}
              onChange={onEmailChanged}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="userPassword">Password</label>
            <input
              type="text"
              className="form-control"
              id="userPassword"
              name="userPassword"
              placeholder="Input password"
              required=""
              value={password}
              onChange={onPasswordChanged}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="userPassword">Repeat Password</label>
            <input
              type="text"
              className="form-control"
              id="userPassword"
              name="userPassword"
              placeholder="Input password"
              required=""
              value={password2}
              onChange={onPassword2Changed}
            />
          </div>          
        </div>
        <hr className="mb-4"/>
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={onCreateUserClicked} disabled={!canSave}>
          Create User
        </button>
      </form>
    </div>
  )
}
