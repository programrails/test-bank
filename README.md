## PW Application Overview

The application is for Parrot Wings (PW, “internal money”) transfer between system users.  
The application will be very “polite” and will inform a user of any problems (i.e. login not successful, not enough PW to remit the transaction, etc.)

### User registration

Any person on Earth can register with the service for free, providing their Name (e.g. John Smith), valid email (e.g. jsmith@gmail.com) and password.  
When a new user registers, the System will verify that the user has provided a unique (not previously registered in the system) email, and has also provided a human name and a password. These 3 fields are mandatory.  
Password is to be typed twice for justification.  
No email verification required.  
On successful registration every User will be awarded with 500 (five hundred) PW starting balance.

### Logging in

Users login to the system using their email and password.
Users will be able to Log out.
No password recovery, change password, etc. functions required.

### PW

The system will allow users to perform the following operations:
1) See their Name and current PW balance always on screen
2) Create a new transaction. To make a new transaction (PW payment) a user will  
    a) Choose the recipient by querying the  User list by name (autocomplete).  
    b) When a recipient is chosen, entering the PW transaction amount. The system will check that the transaction amount is not greater than the current user balance.  
    c) Committing a transaction. Once the transaction succeeds, the recipient account will be credited (PW++) by the entered amount of PW, and the payee account debited (PW--) for the same amount of PW. The system shall display PW balance changes immediately to the user.
3) (Optional) Create a new transaction as a copy from a list of their existing transactions: create a handy UI for a user to browse their recent transactions, and select a transaction as a basis for a new transaction. Once an old transaction is selected, all its details (recipient, PW amount) will be copied to the new transaction.
4) Review a list (history) of their transactions. A list of transactions will show the most recent transactions on top of the list and display the following info for each transaction:  
   a) Date/Time of the transaction  
   b) Correspondent Name  
   c) Transaction amount, (Debit/Credit  for PW transferred)  
   d) Resulting balance  
5) (Optional) Implement filtering and/or sorting of transaction list by date, correspondent name and amount. 

## Implementation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

#### Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### Details

This project is implemented with ES6 using React v.17.0.1 and React-Redux v.7.1.3. The project is built using React Hooks, Redux Toolkit and is constructed as close as possible to the [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) manual guidelines (as of December 2020).

It means that this project incorporates only the newest React-Redux techiques and approaches.

Since this is mostly a demo project it suggests some minor simplifications (over a real production project).

#### Technical stuff

The project uses a third-party API backend server as a database source.

The design is made with Bootstrap 4.5.3 CSS-only styling. The reason is that Bootstrap is commonly the most popular CSS framework.

#### The list of simplifications

* The Redux Toolkit's `createEntityAdapter` API is used only with 1 entity due to some backend API limitations (lack of full RESTful API).
* The error system is most basic only and there is no success messaging.
* No spinners are displayed while fetching queries.
* No autotests are provided.
* A sortable table component is written from scratch because most existent library candidate components are not using React Hooks (and are hard to incorporate).
* Memoization is only minor (this project is not for production).
