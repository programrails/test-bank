import React from 'react'

import {
  Link,
} from 'react-router-dom'


export const HomePage = () => {
  return (          
    <main role="main" className="container">
    <div className="jumbotron">
      <h1>PW Application</h1>
      <p className="lead">PW Application Overview</p>
      <p>The application is for Parrot Wings (PW, “internal money”) transfer between system users. The application will be very “polite” and will inform a user of any problems (i.e. login not successful, not enough PW to remit the transaction, etc.)</p>
      
      <p><Link to={'users'} className="btn btn-lg btn-primary">User registration &raquo;</Link></p>

      <p>Any person on Earth can register with the service for free, providing their Name (e.g. John Smith), valid email (e.g. jsmith@gmail.com) and password. 
      When a new user registers, the System will verify that the user has provided a unique (not previously registered in the system) email, and has also provided a human name and a password. These 3 fields are mandatory. Password is to be typed twice for justification. No email verification required.
      On successful registration every User will be awarded with 500 (five hundred) PW starting balance.</p>
      
      <p><Link to={'login'} className="btn btn-lg btn-primary">Logging in &raquo;</Link></p>

      <ul>
      <li>Users login to the system using their email and password.</li>
      <li>Users will be able to Log out.</li>
      <li>No password recovery, change password, etc. functions required.</li>                  
      </ul>                    

      <p><Link to={'transactions'} className="btn btn-lg btn-primary">Transactions &raquo;</Link></p>

      <p>The system will allow users to perform the following operations:</p>

      <ol>
      <li>See their Name and current PW balance always on screen</li>
      <li>Create a new transaction. To make a new transaction (PW payment) a user will</li>
      <ol>
      <li>Choose the recipient by querying the  User list by name (autocomplete).</li>
      <li>When a recipient is chosen, entering the PW transaction amount. The system will check that the transaction amount is not greater than the current user balance.</li>
      <li>Committing a transaction. Once the transaction succeeds, the recipient account will be credited (PW++) by the entered amount of PW, and the payee account debited (PW--) for the same amount of PW. The system shall display PW balance changes immediately to the user.</li>
      </ol>
      <li>(Optional) Create a new transaction as a copy from a list of their existing transactions: create a handy UI for a user to browse their recent transactions, and select a transaction as a basis for a new transaction. Once an old transaction is selected, all its details (recipient, PW amount) will be copied to the new transaction.</li>
      <li>Review a list (history) of their transactions. A list of transactions will show the most recent transactions on top of the list and display the following info for each transaction:</li>
      <ol>
      <li>Date/Time of the transaction</li>
      <li>Correspondent Name</li>
      <li>Transaction amount, (Debit/Credit  for PW transferred)</li>
      <li>Resulting balance</li>
      </ol>
      <li>(Optional) Implement filtering and/or sorting of transaction list by date, correspondent name and amount.</li>
      </ol>                   
    </div>
    </main>
  )
}
