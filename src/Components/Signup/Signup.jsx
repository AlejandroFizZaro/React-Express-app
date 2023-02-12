import { createHashRouter, Form, NavLink, Outlet, useActionData, useLoaderData } from "react-router-dom";
import { checkAdminRole, checkRole, tokenHealthStatus } from '../Auth/UseTokenAuth';
import './Signup.css';

export async function action ({ request, params }) {
}

export async function loader ({ request, params }) {
    await tokenHealthStatus('sign up');
    const role = await  checkRole();
    return role
}

export default function SignupAdmin () { 
    const role = useLoaderData();

    return(
        <>
            <h1>Sign up </h1>
            <ul className="options">
                {role === 'admin'
                ?
                    <>
                        <li><NavLink to={'user'}>User</NavLink></li>
                        <li><NavLink  to={'teacher'}>Teacher</NavLink></li>
                        
                    </>
                :role === 'teacher'
                    ?
                        <>
                            <li><NavLink  to={'student'}>Student</NavLink></li>
                        </>
                    :<></>}
                
            </ul>

            <div>
                <Outlet/>
            </div>
        </>
    )
}
