import React from 'react';

const Nav = () => (
  // <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  //   <a className="navbar-brand" href="/">News Warehouse</a>
  //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
  //     <span className="navbar-toggler-icon"></span>
  //   </button>

  //   <div className="collapse navbar-collapse" id="navbarColor01">
  //     <ul className="navbar-nav mr-auto">
  //       <li className="nav-item active">
  //         <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
  //       </li>
  //       <li className="nav-item">
  //         <a className="nav-link" href="/">Features</a>
  //       </li>
  //     </ul>
  //     <form className="form-inline my-2 my-lg-0">
  //       <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
  //       <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
  //     </form>
  //   </div>
  // </nav>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">NWHouse</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            <li className="nav-item">
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
              </form>
           </li>
          </ul>
        </div>
      </div>
    </nav>
)

export default Nav;