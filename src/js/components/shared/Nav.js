import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CountryDropDown from './CountryDropDown';
import SourceDropDown from './SourceDropDown';
import CategoryList from '../../utils/categoryList';
import Country from '../../utils/Country';

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
              { CategoryList.map((category, index) => (
                <li className={category.toLowerCase() === this.props.newActiveCategory ? 'nav-item news-nav-item active' : 'nav-item news-nav-item'} key={index}>
                  <Link className="nav-link" to={`/category/${category.toLowerCase()}`}>{category}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              ))}
              {/*<li className="nav-item news-nav-item">
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search..."/>
                </form>
              </li>*/}
              <li className="nav-item news-nav-item">
                <SourceDropDown />
              </li>
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