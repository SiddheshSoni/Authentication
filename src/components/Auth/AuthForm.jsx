import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/AuthenticationContext';

// API =AIzaSyCsfWy_iELOhjwPgk7wmq8k2Ldly3PqApY; 
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  const AuthCtxt = useContext(AuthContext);

  const submitHandler= async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    console.log(enteredEmail,enteredPassword);
    let url = isLogin ? 'signInWithPassword' : 'signUp';
      
    try{
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${url}?key=AIzaSyCsfWy_iELOhjwPgk7wmq8k2Ldly3PqApY`, 
        {
          method: 'POST',
          body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }),
        headers:{
          'Content-Type':'application/json'
        }
      });
      setIsLoading(false);
      
      const data = await res.json();
      
      if(res.ok){
        AuthCtxt.onLogin(data.idToken);
        console.log(data);
      }else{
        let errorMessage = 'Authentication failed!';
        if(data && data.error && data.error.message){
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage)
      }
    }catch(err){
      setIsLoading(false);
      setError(err);
      console.log(err);
    }      
    
      
  };
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? <p>Sending request...</p> : <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
          {error && alert(error)}
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



// , 
      // {
      // method: 'POST',
      // body: JSON.stringify({
      //   email: enteredEmail,
      //   password: enteredPassword,
      // }),
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // }