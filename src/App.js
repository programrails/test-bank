import React from 'react'
import { Navbar } from './app/Navbar'
import { LoginPage } from './features/auth/LoginPage'
import { UsersPage } from './features/users/UsersPage'
import { TransactionsPage } from './features/transactions/TransactionsPage'
import { DocPage } from './app/DocPage'
import { HomePage } from './app/HomePage'
import { ErrorFlash } from './app/ErrorFlash'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (    
    <Router>      
      <Navbar />
        <ErrorFlash />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage />
            )}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/transactions" component={TransactionsPage} />
          <Route exact path="/doc" component={DocPage} />
        </Switch>      
    </Router>
  )
}

export default App;
