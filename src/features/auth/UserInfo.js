// import React, { useEffect, useState } from 'react'
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { fetchUserInfo } from './authSlice'

export const UserInfo = () => {
  // const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const idToken = useSelector((state) => state.auth.idToken)
  const currentUser = useSelector((state) => state.auth.currentUser)

  const dispatch = useDispatch()

  // https://stackoverflow.com/a/56492329
  const asyncGetUserInfo = useCallback(
    async () => {
      if (idToken) {
        try {
          // setAddRequestStatus('pending')
          const resultAction = await dispatch(
            fetchUserInfo()
          )        
          unwrapResult(resultAction)
          // console.log('Successfully fetched the user info: ', user_info)
        } catch (err) {
          // console.error('Failed to fetch the user info: ', err)
        } finally {
          // setAddRequestStatus('idle')
        }
      }
    },
    [idToken, dispatch],
  );

  useEffect(() => {
    if (idToken) {
      asyncGetUserInfo()
    }
  }, [idToken, asyncGetUserInfo]);

  let renderedContent

  if (currentUser) {
    renderedContent =
      <React.Fragment>
        <li className="nav-item mx-2 text-light">Name: {currentUser.username}</li>
        <li className="nav-item mx-2 text-light">Email: {currentUser.email}</li>
        <li className="nav-item mx-2 text-light">Balance: {currentUser.balance}</li>
      </React.Fragment>
  }

  return (
    <React.Fragment>
      {renderedContent}
    </React.Fragment>
  )
}
