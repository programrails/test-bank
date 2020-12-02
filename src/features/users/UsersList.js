import React from 'react'
import { useSelector } from 'react-redux'

export const UsersList = () => {
  const idTokens = useSelector((state) => state.users.idTokens)

  const renderedIdTokens = idTokens.map((idToken, index) => {  
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{idToken}</td>
      </tr>
    )
  })

  return (
    <div className="table-responsive">
    <h4>Id Tokens (of created users)</h4>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>index</th>
            <th>Id Token</th>
          </tr>
        </thead>
        <tbody>
        {renderedIdTokens}
        </tbody>
      </table>
    </div>
  )
}
