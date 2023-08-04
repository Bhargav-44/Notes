import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
  )
}

export default Nav
