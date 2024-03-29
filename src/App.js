import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext, { AuthContextProvider } from './store/auth-context';
import { useContext } from 'react';

function App() {
  const authCTX = useContext(AuthContext)
  console.log(authCTX.isLoggedIn,'logINstatus')
  return (
    <Layout>
    <Switch>
    <Route path='/' exact>
    <HomePage />
    </Route>
   { !authCTX.isLoggedIn && <Route path='/auth'>
    <AuthPage />
    </Route>}
    { authCTX.isLoggedIn && <Route path='/profile'>
    <UserProfile />
    </Route>}
    <Route path="*" >
      <Redirect to='/'/>
    </Route>
    </Switch>
    </Layout>
  );
}

export default App;
