import { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enterEmail , setEnterEmail] = useState('')
  const [password , setPassword] = useState('')

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
e.preventDefault();

if(isLogin){
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXSNb20bgVRFykidj_E0BGJzlwNaZSYos',{
    method:'POST',
    body:JSON.stringify({email:enterEmail, password:password ,returnSecureToken:true}) ,
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res=>{
    if(res.ok){
      return res.json()
    }else{
      return res.json().then((data)=>window.alert(data.error.message))
    }
  }).then((res)=>console.log(res))

}else{
  // console.log(email , password)
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXSNb20bgVRFykidj_E0BGJzlwNaZSYos',{
    method:'POST',
    body:JSON.stringify({email:enterEmail, password:password ,returnSecureToken:true}) ,
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res=>{
    if(res.ok){
      return res.json()
    }else{
      return res.json().then((data)=>window.alert(data.error.message))
    }
  }).then((res)=>console.log(res))
}
  }

  const emailHandler=(e)=>{
    setEnterEmail(e.target.value)
  }
  const passwordHandler=(e)=>{
    setPassword(e.target.value)
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={emailHandler}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required onChange={passwordHandler} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
