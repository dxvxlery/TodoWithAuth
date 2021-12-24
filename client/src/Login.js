import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from "react-router-dom";
import "../src/Login.css"

function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loginError,setLoginError] = useState(false);
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function loginUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:4000/login', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setLoginError(false);
        setRedirect(true);
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (
    <form action="" onSubmit={e => loginUser(e)}>
      {loginError && (
        <div>Неверный логин или пароль</div>
      )}
      <input className="email_input" type="email" placeholder="Введите почту" value={email} onChange={e => setEmail(e.target.value)}/><br />
      <input className="email_input" type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)}/><br />
      <button className="submit_button" type="submit">Войти</button>
    </form>
  );
}

export default Login;