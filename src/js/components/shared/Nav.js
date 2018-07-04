import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { CountryDropDown, SearchPopOver } from './';
import { Country, categoryList } from '../../utils';

class Nav extends Component {
  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">NWHouse</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              { categoryList.map((category, index) => (
                <li className={category.toLowerCase() === this.props.newActiveCategory ? 'nav-item news-nav-item active' : 'nav-item news-nav-item'} key={index}>
                  <Link className="nav-link" to={`/category/${category.toLowerCase()}`}>{category}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              ))}
              <li className="nav-item news-nav-item">
                <Link className="nav-link" to={'/sources'}>All
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item news-nav-item">
                <SearchPopOver />
              </li>
              {/*<li className="nav-item news-nav-item">
                <SourceDropDown />
              </li>*/}
              <li className="nav-item news-nav-item">
                <CountryDropDown setCountry={Country.getCountry()}/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ home }) => {
  return {
    newActiveCategory: home.newCategory
  }
}

export default connect(mapStateToProps, null)(Nav);