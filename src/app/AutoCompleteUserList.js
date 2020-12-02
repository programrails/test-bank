// import fetch from 'isomorphic-fetch'; - replaced to client.js
import React from 'react'
import { connect } from 'react-redux'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { client } from '../api/client'

// WARNING
// This library component is made as a class component
// although all the other components are functional with hooks.
// Ideally this component should have been rewritten also
// as a functional one with hooks.
// But that would take too much effort. I could do that, but that would be stupid.
// So I decided to keep it as is and simply get
// the secret token from the Redux store - where that
// token is placed by other functional-with-hooks components.

import 'react-bootstrap-typeahead/css/Typeahead.css';

const PER_PAGE = 50;


const makeAndHandleRequest = async (query, {onTransactionError, auth}) => {

  const body = {filter: `${query}`}

  try {
    const response = await client.auth_post('api/protected/users/list', body, auth.idToken)

    const items = JSON.parse(response)

    const options = items.map(i => ({
      id: i.id,
      name: i.name,
    }))
    const optionsLength = options.length

    return { options, optionsLength }
  } 
  catch (err) {
    onTransactionError(err)
    return -1
  } 
}


class AutoCompleteUserList extends React.Component {
  state = {
    isLoading: false,
    options: [],
    query: '',
  };  

  _cache = {};

  _handleInputChange = query => {
    this.setState({ query });
    this.props.onChange(query);
  };

  _handleSearch = async query => {
    if (this._cache[query]) {
      this.setState({ options: this._cache[query].options })
      return
    }

    this.setState({ isLoading: true })

    const resp = await makeAndHandleRequest(query, this.props)

    if (resp === -1) {
      // console.log('User not authenticated.')      
      return
    }

    this._cache[query] = { ...resp, page: 1 }

    this.setState({
      isLoading: false,
      options: resp.options,
    })
  }

  render() {
    
    return (
      <AsyncTypeahead
        {...this.state}
        id="async-pagination-example"
        //https://stackoverflow.com/a/60706540
        labelKey="name"
        value="1"
        maxResults={PER_PAGE - 1}
        minLength={1}
        onInputChange={this._handleInputChange}
        onSearch={this._handleSearch}
        paginate
        onChange={()=>{}} // do-nothing stub (required)
        placeholder="Input transaction recipient username"
        renderMenuItemChildren={option => (
          <div key={option.id}>
            <span>{option.name}</span>
          </div>
        )}
        useCache={false}
        selected={[this.props.username]}
      />
    );
  }  
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTransactionError: (error) => {
      dispatch(setTransactionsError(error))
    }
  }
}

function setTransactionsError(error) {
  return { type: 'transactions/setTransactionsError', payload: error }
}



const mapStateToProps = (store) => {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteUserList)