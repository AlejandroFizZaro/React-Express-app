import { decodeToken } from "react-jwt";

  export async function fetchToken(formData) { 
    try{
      const credentials = Object.fromEntries(formData);

      const token = await fetch ('/login/token' , {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        username: credentials.username,
        password: credentials.password,
      }),
      }).then(response => response.json());
      
      return token;
    }
    catch(err){
      console.error(err)
    };
  }

  export async function checkToken  ()  {
    const localToken = localStorage.getItem('token');
    let token;

    localToken === 'undefined'
    ? token = null
    : token = JSON.parse(localToken);

    return token;
  };
  
  export async function localToken (){
    const localToken = JSON.parse(localStorage.getItem('token'));
    return(localToken); 
  }

  export async function saveToken  ( token )  {
    localStorage.setItem('token', JSON.stringify(token));
  };

  export async function removeToken  ()  {
    localStorage.removeItem('token');
  };
  export async function checkTokenContent () {
    const localToken = localStorage.getItem('token');
    const tokenContent = decodeToken(JSON.stringify(localToken.token));
    return(tokenContent); 
  }

  export async function checkTokenUser () {
    const localToken = localStorage.getItem('token');
    const decodedToken = decodeToken(JSON.stringify(localToken));
    return(decodedToken?.user);
  }

  export async function isTokenExpired() {
    const localToken = localStorage.getItem('token');
    const decodedToken = decodeToken(JSON.stringify(localToken));
    let isExpired;

    if (decodedToken?.exp) {
      let expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      isExpired = expirationDate.valueOf() < new Date().valueOf();
    }

    return isExpired; 
  }

  export async function checkRole(){
    const role = await checkTokenUser().then((user) => user.type);
    return role;
  }

  export async function checkAdminRole(){
    const role = await checkTokenUser().then((user) => user.type);
    if(role == 'admin'){
      return true;
    }
    else{
      throw new Response('', {
        status: 404,
        statusText: `Your users cannot be loaded because the user is not an admin`,
      })
    } ;
  }

  export async function checkTeacherRole(){
    const role = await checkTokenUser().then((user) => user.type);
    if(role == 'teacher'){
      return true;
    }
    else{
      throw new Response('', {
        status: 404,
        statusText: `Your users cannot be loaded because the user is not an teacher`,
      })
    } ;
  }

  /**
 * Try to check if the Token is expired or was removed from LocalToken. If at least one condition happen:
 *  @Remove the Token from Local Storage
 *  @Return an error message
 */
  export async function tokenHealthStatus(source) {
  if (( await isTokenExpired() ) || !( await localToken() ) ){
      await removeToken();
      throw new Response('', {
        status: 404,
        statusText: `Your ${source} cannot be loaded because your credentials have been expired or removed. Please Log in again`,
      })
    }
  }