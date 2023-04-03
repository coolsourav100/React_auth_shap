import { useContext, useState } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const [password , setPassword] = useState('')
  const authCTX = useContext(AuthContext)
const history = useHistory()

  const clickHandler= async(e)=>{
    e.preventDefault()
  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBXSNb20bgVRFykidj_E0BGJzlwNaZSYos',{
    method:'POST',
    body:JSON.stringify({idToken:authCTX.token, password:password ,returnSecureToken:true}) ,
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res=>{
    // return res.json()
    if(res.ok){
      // console.log(res.json())
      return res.json()
    }else{
      return res.json().then((data)=>window.alert(data.error.message))
    }
  }).then((res)=>{
    window.alert('Password Had be Changed Succesfully ')
    history.replace('/')
    console.log(res)})
    .catch((err)=>{
      console.log(err,'err')
    })
    
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className={classes.action}>
        <button onClick={clickHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
