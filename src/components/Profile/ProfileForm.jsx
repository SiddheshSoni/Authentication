import { useContext, useRef, useState} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
const ProfileForm = () => {
  const navigate = useNavigate();
  const {token, onLogout} = useContext(AuthContext);
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newPassword = passwordInputRef.current.value;

    try{
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsfWy_iELOhjwPgk7wmq8k2Ldly3PqApY', 
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
            password: newPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await res.json();
      
      if(res.ok){
        setIsLoading(false);
        console.log(data);
        alert('Password changed successfully!');
        onLogout();
        navigate('/auth');
      }
      else{
        let errorMessage = 'Authentication failed!';
        if(data && data.error && data.error.message){
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage)
      }
    }
    catch(err){
      setIsLoading(false);
      setError(err);
      console.log(err);
    }
  }
  
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInputRef}/>
      </div>
      <div className={classes.action}>
        {isLoading ? <p>Sending request...</p> : <button type='submit'>Change Password</button>}
        {error && alert(error)}
      </div>
    </form>
  );
};

export default ProfileForm;