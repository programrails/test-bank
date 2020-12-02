//Custom styles for this template
import '../navbar-top-fixed.css';

import React from 'react'
import { NavbarUserSection } from '../features/auth/NavbarUserSection'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link to={'/'} className="navbar-brand">PW Application</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'users'} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'transactions'} className="nav-link">
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'doc'} className="nav-link">
              Doc
            </Link>
          </li>      
        </ul>
        <div className="mt-2 mt-md-0 mx-2">
          <NavbarUserSection />
        </div>
      </div>
    </nav>
  )
}
