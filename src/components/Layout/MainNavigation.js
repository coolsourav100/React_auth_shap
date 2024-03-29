import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory()
  const authCTX = useContext(AuthContext)
  const isLoggedIn = authCTX.isLoggedIn
  console.log(isLoggedIn)
  const clickHandler =()=>{
    authCTX.logout()
    window.alert('LogOut Successful!!')
    history.replace('/auth')
    // window.localStorage.removeItem('idToken')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
          { isLoggedIn && (<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {isLoggedIn && (<li>
            <button onClick={clickHandler}>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
