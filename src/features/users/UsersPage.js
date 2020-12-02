import React from 'react'
import { CreateUserForm } from './CreateUserForm'
import { UsersList } from './UsersList'

export const UsersPage = () => {

  return (
    <main role="main" className="container">
    <h2>Users</h2>
    <div className="row justify-content-md-center">
      <hr className="mb-8"/>
      <CreateUserForm />
      <hr className="mb-8"/>      
    </div>
    <hr className="mb-8"/>
    {<UsersList />}
    </main>
  )
}
