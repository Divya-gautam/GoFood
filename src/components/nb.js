

import { Outlet, Link } from "react-router-dom";

export default function Nb(){

    return (
        <>
           <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            </div>
          </nav>
          <Outlet/>

        </>
      );

}