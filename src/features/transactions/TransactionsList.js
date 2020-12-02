import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'

import { listTransactions, selectAllTransactions } from './transactionsSlice'
import { TableSortedFilteredCopyable } from '../../app/TableSortedFilteredCopyable'

export const TransactionsList = () => {

  // const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const currentUser = useSelector((state) => state.auth.currentUser)
  const transactions = useSelector(selectAllTransactions)

  const dispatch = useDispatch()
  const history = useHistory()

  const onLoadPage = useCallback(
    async () => {
      if (true) {
        try {
          // setAddRequestStatus('pending')
          const resultAction = await dispatch(
            listTransactions()
          )

          unwrapResult(resultAction)
          // console.log('Successfully fetched the transactions list: ', transactions_list)
        } catch (err) {
          // console.error('Failed to fetch the transactions list: ', err)
        } finally {
          // setAddRequestStatus('idle')
        }
      }
    },
  [dispatch],
  );  

  useEffect(() => {
    if (currentUser) {
      onLoadPage()
    }
    else
    {
      localStorage.setItem('test-bank/redirect_error', 'The user in not logged in.')

      history.push('/')
    }
  }, [currentUser, onLoadPage, dispatch, history]);

  const tableConfig = {
    tableName : 'Transactions',
    headerTitles : ['ID', 'Username', 'Amount', 'Balance', 'Date'],
    headerNames : ['id', 'username', 'amount', 'balance', 'date'], //must be of same quantity
    sortableHeaders : ['username', 'amount', 'date'],
    filterableHeaders : ['username', 'amount', 'date'],
    defaultSortedName : 'date'
  }


  return (
    <TableSortedFilteredCopyable tableRows={transactions} tableConfig={tableConfig}/>
  )
}
