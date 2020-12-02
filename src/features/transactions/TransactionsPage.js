import React from 'react'
import { TransactionsList } from './TransactionsList'
import { CreateTransactionForm } from './CreateTransactionForm'

export const TransactionsPage = () => {

  return (
    <main role="main" className="container">
    <h2>Transactions</h2>
    <div className="row justify-content-md-center">      
      <hr className="mb-8"/>
      <CreateTransactionForm />
      <hr className="mb-8"/>      
    </div>
    <hr className="mb-8"/>
    {<TransactionsList />}
    </main>
  )
}
