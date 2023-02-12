import { Form, redirect, useActionData } from "react-router-dom";

import React from "react";
import  { fetchToken, saveToken, checkToken }  from "../Auth/UseTokenAuth";
import './Login.css';

export async function action ({ request, params }) {
  // The inputs (email and password) are collected with the formData
  const formData = await request.formData();
  
  // Fetch the token
  const token = await fetchToken(formData);
  
  // Save the fetched token
  await saveToken( token );

  // direction is a variable that will state the url to redirect.
  let direction;
  // Initialiting a variable that render errors in the Login screen.
  let error = {};

  // Check if the token exists
  await checkToken().then((token) =>{
    token?.token 
    ? ( direction =  redirect('layout') )   // The token is correct --> access granted
    : ( error = 'Wrong credentials');       // The token is not correct ---> access denied
  });
  
  // If the error variable has any value, the error element (below the login button) will render a value 
  if (Object.keys(error).length){
    return error;
  }

  // If there is no errors --> redirect to layout
  return direction;
}

export default function Login() {
  // useActionData will take the variable values that were returned from the action
  const error =  useActionData();

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>

      <Form method='post' >
        <label>
            <p>Username</p>
          <input
            placeholder="username"
            aria-label="username"
            type="text"
            name="username"
          />
        </label>
        <label>
          <p>Password</p>
        <input
          placeholder="password"
          aria-label="password"
          type="password"
          name="password"
        />
        </label>
        <div >
          <button type="submit" >Log in</button>
        </div>
        
      </Form>
        <div className="errorLogin">
          {error}
        </div>
    </div>
  );
};