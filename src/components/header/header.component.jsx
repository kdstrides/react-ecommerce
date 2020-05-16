import React from 'react';
import { connect } from 'react-redux';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/original.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>

    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/shop">CONTACT</Link>
      {
        currentUser ?
          <div className="option" onClick={() => auth.signOut()}> SIGN OUT</div>
          : <Link className="option" to="/signin">SIGNIN</Link>
      }
      <CartIcon />
    </div>
    {
      !hidden ? <CartDropdown /> : null
    }
  </div>
);

const mapStateProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateProps)(Header);