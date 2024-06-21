import { useState } from 'react';
import classes from './auth-form.module.css';
import { useSession, signIn, signOut } from "next-auth/react"

async  function createuser(mail,password){
    const response = await fetch("api/auth/signup", {
      method:'POST',
      body:JSON.stringify({mail,password}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data=await response.json()
    if (!response.ok) {
      console.error(data.message||'something went wrong!')
    }

  return data
}


function AuthForm() {
  const [mail, setmail] = useState("")
  const [password, setpassword] = useState("")

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  async function submithandler(event) {
    event.preventDefault();
    if (isLogin) {
      const result= await signIn('credentials',{redirect:false,
        mail:mail,
        password:password,
      })
      console.log(result)
    } else {
      try {
        const result = await createuser(mail, password);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={e=>setmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  onChange={e=>setpassword(e.target.value)}/>
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
}

export default AuthForm;
