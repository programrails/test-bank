import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser, restoreIdToken } from './authSlice'
import { UserInfo } from './UserInfo'
import { clearTransactions } from '../transactions/transactionsSlice'

export const NavbarUserSection = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const idToken = useSelector((state) => state.auth.idToken)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const storedIdToken = localStorage.getItem('test-bank/idToken')
    if (storedIdToken) {      
      dispatch(restoreIdToken(storedIdToken))
    }
  }, [idToken, dispatch])

  const onLogoutUserClicked = () => {
    if (currentUser) {
      dispatch(clearTransactions())
      dispatch(logoutUser())
      localStorage.removeItem('test-bank/idToken')
      history.push('/')
    }
  }

  let rendered_content

  if (currentUser) {
    rendered_content =
      <li className="nav-item ml-2 text-primary" style={{cursor: 'pointer'}}>
        <div onClick={onLogoutUserClicked}>Log Out</div>
      </li>
  }
  else {
    rendered_content =
      <li className="nav-item"><Link to={'/login'} className="">Log In</Link></li>
  }

  return (
  <ul className="navbar-nav mr-auto">
    <UserInfo />
    {rendered_content}
  </ul>
  )
}
