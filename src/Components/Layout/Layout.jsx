import { checkToken, checkTokenContent, removeToken, checkTokenUser, tokenHealthStatus } from '../Auth/UseTokenAuth';
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import './Layout.css';

export async function action ({ request, params }) {
  // Remove the token in LocalStorage
    removeToken();
  
  // Redirect the user to the main screen
  return redirect('/');
}

export async function loader () {
    await tokenHealthStatus('layout')
    const user = await checkTokenUser().then((res) => {return (res)});
    
    return {user} ;
}

export default function Layout () {
    // Get the user variable from the loader ( loader must be set up in App.jsx)
    const {user} = useLoaderData();
    const isAdmin = () => {
        return user?.type === 'admin';
    }

    // 'navId' variable set the className for the links.
    // In Layout.css, the classes 'active' or 'pending' set the element background color (blue for 'active')
    const navId = ({isActive, isPending }) => 
                    isActive
                        ?'active'
                        :isPending
                            ?'pending'
                            :'';
    return(
        <>
            {/* Sidebar with the list of options, according to the user role:
                (Admin role: Profile, Users and Students)
                (Teacher role: Profile and Students) */}
            <div id='sidebar'>
                <nav>
                    <ul>
                        <li>
                            <NavLink className={navId} to={`/layout/profile`}>Profile</NavLink>
                        </li>
                        {isAdmin() == true
                        ?
                            <>
                                <li>
                                    <NavLink className={navId} to={'/layout/users'}>Users</NavLink>
                                </li> 
                            </>
                            
                        :   <></>
                        }
                        <li>
                            <NavLink className={navId} to={'/layout/students'}>Students</NavLink>
                        </li>
                            <>
                                <li>
                                    <NavLink className={navId} to={'/layout/signup'}>Sign up</NavLink>
                                </li> 
                            </> 
                            <></>
                    </ul>
                </nav>
                
                <Form id='logout' method='post' >
                    <button type="submit" >Logout</button>
                </Form>
            </div>


            {/* Child routes will show up here */}
            <div id ='detail' >
                <Outlet/>
            </div>
        </>
    )
};