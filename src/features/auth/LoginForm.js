import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'

import { loginUser, setAuthError } from './authSlice'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [isDone, setDone] = useState(false)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const history = useHistory()

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onPassword2Changed = (e) => setPassword2(e.target.value)

  const canSubmit = 
    [username, email, password, password2].every(Boolean) && addRequestStatus === 'idle'

  // https://stackoverflow.com/a/56608792
  useEffect(() => {
    if (isDone) {
      history.push('/')
    }
  },[isDone, history]);  

  const onLoginUserClicked = async (e) => {
    e.preventDefault(); // https://stackoverflow.com/a/50193256

    if (password !== password2) {
      dispatch(setAuthError('Password re-type does not match.'))
      return
    } 

    if (canSubmit) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          loginUser({ username, email, password })
        )
        const idToken = unwrapResult(resultAction)
        setUsername('')
        setEmail('')
        setPassword('')
        setPassword2('')
        localStorage.setItem('test-bank/idToken', idToken)

        //console.log('Successfully logged in the idToken: ', idToken)
        setDone(true)
      } catch (err) {
        // console.error('Failed to log in a idToken: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <div className="col-md-8">
      <h4 className="mb-3">Log In</h4>
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
        <div className="row">
        </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              name="userPassword"
              placeholder="Input password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="userPassword">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              name="userPassword"
              placeholder="Input password"
              value={password2}
              onChange={onPassword2Changed}
            />
          </div>          
        </div>
        <hr className="mb-4"/>
        <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={onLoginUserClicked} disabled={!canSubmit}>
          Log In
        </button>
      </form>
    </div>
  )
}
