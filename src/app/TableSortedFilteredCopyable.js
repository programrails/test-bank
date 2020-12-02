///////////////////////////////////////////////////////////////////////

// The React component representing a table with the ability to sort columns,
// filter rows and copy rows data. Depends on the 'table_sorting.css' file.

// Inspired by https://www.smashingmagazine.com/2020/03/sortable-tables-react/

// Adjust these import paths as needed:

import '../table_sorting.css';
import { copyId } from '../features/transactions/transactionsSlice'

///////////////////////////////////////////////////////////////////////

import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const TableSortedFilteredCopyable = ({tableRows, tableConfig}) => {
  
  const orderNames = {
    '-1' : 'order-desc',
     '0'  : 'order',
     '1'  : 'order-asc',
  }

  // const tableConfig = {
  //   tableName : 'Transactions',
  //   headerTitles : ['ID', 'Username', 'Amount', 'Balance', 'Date'],
  //   headerNames : ['id', 'username', 'amount', 'balance', 'date'], //must be of same quantity
  //   sortableHeaders : ['username', 'amount', 'date'],
  //   filterableHeaders : ['username', 'amount', 'date'],
  //   defaultSortedName : 'date',
  // }

  const { 
    tableName,
    headerTitles,
    headerNames,
    sortableHeaders,
    filterableHeaders,
    defaultSortedName,
  } = tableConfig

  const dispatch = useDispatch()
  const [sorting_key, setSortingKey] = useState(defaultSortedName)
  const [sortingDirection, setSortingDirection] = useState(1)
  const [filteredColumns, setFilteredColumns] = useState(filterableHeaders.slice().fill(''))

  const sortingFuncGenerator = useCallback(
  () => {
    if (sortingDirection === 1)
      // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
      return () => (a, b) => {
        return a[sorting_key].toString().localeCompare(b[sorting_key])
      }
    else
      return () => (a, b) => {
        return b[sorting_key].toString().localeCompare(a[sorting_key])        
      }
  },
  [sorting_key, sortingDirection],
  )

  const [sortFunc, setSortFunc] = useState(sortingFuncGenerator(1))

  const sortableClass = (index) => {
    const colName = headerNames[index]

    if (colName === sorting_key) 
      return orderNames[sortingDirection.toString()]
    else 
      return orderNames['0']
  }  

  const isSortableColumn = (index) => {
    const headerName = headerNames[index]
    return sortableHeaders.includes(headerName)
  }  
 
  const onTableHeaderClicked = (e) => {
    const columnTitle = e.target.parentElement.innerText

    const colIndex = headerTitles.indexOf(columnTitle)

    const colName = headerNames[colIndex]

    setSortingKey(colName)    

    if (colName === sorting_key) 
      setSortingDirection(sortingDirection * -1)
    else 
      setSortingDirection(1)
  }


  useEffect(() => {
    const sortFunc = sortingFuncGenerator(sortingDirection)

    setSortFunc(sortFunc)
  }, [sorting_key, sortingDirection, sortingFuncGenerator]);


  const onCopyRowClicked = (e) => {
    const rowId = e.target.getAttribute('row-id')
    dispatch(copyId(rowId))
  }


  let filteredRows = tableRows  

  filteredColumns.forEach((filterValue, index) => {
    if (filterValue !== '') {

      const filterName = filterableHeaders[index]

      filteredRows = filteredRows
      .filter(row => row[filterName].toString().includes(filterValue))
    }
  })

  // https://kentcdodds.com/blog/usememo-and-usecallback
  const orderedRows = React.useMemo(() => {
  if (!filteredRows) return []

  return filteredRows
    .slice()
    .sort(sortFunc)
  }, [sortFunc, filteredRows ]);

  const renderedTransactions = orderedRows.map((row, index) => {
    return (
      <tr key={row.id}>
        <td>{index+1}</td>
        {
          headerNames.map((name, index) => (
            <td key={index}>{row[name]}</td>
          ))
        }
        <td>
          <button
            row-id={row.id}
            className="btn btn-primary1 btn-secondary1 btn-light1 btn-success btn-lg1 btn-block"
            type="button"
            onClick={onCopyRowClicked}>
          Copy
        </button>
        </td>
      </tr>
    )
  })


  const isFilterableColumn = (index) => {
    const headerName = headerNames[index]
    return filterableHeaders.includes(headerName)
  }

  const filterName = (index) => {    
    return headerNames[index]
  }

  const filteredValue = (index) => {
    const headerName = headerNames[index]
    const filterIndex = filterableHeaders.indexOf(headerName)
    return filteredColumns[filterIndex]
  }

  const onFilteredValueChanged = (e) => {
    const filterName = e.target.parentElement.getAttribute('data-filter-name')
    const filterIndex = filterableHeaders.indexOf(filterName)
    const updatedFilteredColumns = filteredColumns.slice()
    updatedFilteredColumns[filterIndex] = e.target.value
    setFilteredColumns(updatedFilteredColumns)
  }

  const onFilteredValueCleared = (e) => {
    const filterName = e.target.parentElement.getAttribute('data-filter-name')
    const filterIndex = filterableHeaders.indexOf(filterName)
    const updatedFilteredColumns = filteredColumns.slice()
    updatedFilteredColumns[filterIndex] = ''
    setFilteredColumns(updatedFilteredColumns)
  }  

  const filtering =
    <tr className="form-inline1 d-flex1">    
    <td/>
    {
      headerNames.map((name, index) => {
        if (!isFilterableColumn(index)) {return <td key={index}/>}
        else
          return (
            <td key={index} className="form-group1 d-flex1" data-filter-name={filterName(index)}>
              <input
              type="text"
              style={{width: '85%'}}
              className="form-control1 flex-grow-1 w-85"
              placeholder={`Filter ${filterName(index)}`}
              required=""
              value={filteredValue(index)}
              onChange={onFilteredValueChanged}
              />
              <button className="btn btn-primary btn-sm form-control1 flex-grow-1" onClick={onFilteredValueCleared}>
                X
              </button>
            </td>
          )
      })
    }
    <td/>
    </tr>


    return (
      <div className="table-responsive">
      <h4>{tableName}</h4>
        <table className="table table-striped table-sm table-sorting">
          <thead>
            <tr>
              <th>index</th>
              {
                headerTitles.map((title, index) => {
                  return (
                    <th key={index}>
                        {title}
                        <span
                          className={isSortableColumn(index) ? sortableClass(index) : null}
                          onClick={isSortableColumn(index) ? onTableHeaderClicked : null}
                        >
                        </span>
                    </th>
                  )
                }
                )
              }
              <th></th>
            </tr>
          </thead>
          <tbody>
          {filtering}
          {renderedTransactions}
          </tbody>
        </table>
      </div>
    )
}
