import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';
// API =AIzaSyCsfWy_iELOhjwPgk7wmq8k2Ldly3PqApY; 
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  const submitHandler=(e)=>{
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    console.log(enteredEmail,enteredPassword);
    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCsfWy_iELOhjwPgk7wmq8k2Ldly3PqApY').then(res=>{
      if(res.ok){
        return res.json();
      }else{
        throw new error();
      }
    })
    .catch(err=>{
        setError(err.message);
        setIsLoading(false);
      });
  }

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