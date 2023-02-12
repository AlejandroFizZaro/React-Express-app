
import { NavLink, Form, useLoaderData, useActionData } from "react-router-dom"
import { checkAdminRole, tokenHealthStatus } from "../../Auth/UseTokenAuth";
import { createUser, isUserDuplicate } from "../../Helpers/Helpers";
import '../Signup.css';

export async function action ({ request, params }) {
    const formData = await request.formData();
    const inputs  = Object.fromEntries(formData);
    const email = inputs.email;
    const dni = inputs.dni;

    let result = { message: '', success: false};

    // If there are empty values, generate an error code
    Object.values(inputs).includes('')
    ? result.message = 'There are empty fields'
    : 
        await isUserDuplicate(email, dni).then((res) => res.isDuplicate)
        ? result.message = 'The user is already registered in the system'
        : await createUser(formData).then(result.success = true );

    if (result.success === true){
        result.message = 'The user was created successfully';  
    }
    return result;
}

export async function loader ({ request, params }) {
    await tokenHealthStatus('sign up');
    await checkAdminRole();

    const contact = {
        name: '',
        last_name: '',
        dni: '',
        email: '',
        password: '',
        active: '',
        date_of_birth: '',
        type: '',
    }
    return contact;
}

export default function SignupAdminUser () {
    
    const user = useLoaderData();
    let result= useActionData();
    
    return(
        <>
            <h3>Create User</h3>
            
            <Form method='post' className='signup'>
                <label>
                    <span>Full Name</span>
                    <input
                        placeholder="My first name"
                        aria-label="name"
                        type="text"
                        name="name"
                        defaultValue={user.name}
                    />
                    <input
                        placeholder="My last name"
                        aria-label="last_name"
                        type="text"
                        name="last_name"
                        defaultValue={user.last_name}
                    />
                </label>
                <label>
                    <span>DNI</span>
                    <input
                        placeholder="123456789Z"
                        aria-label="dni"
                        type="text"
                        name="dni"
                        defaultValue={user.dni}
                    />
                </label>
                <label>
                    <span>Email</span>
                    <input
                        placeholder="emailExample@gmail.com"
                        aria-label="email"
                        type="email"
                        name="email"
                        defaultValue={user.email}
                    />
                </label>
                <label>
                    <span>Password</span>
                    <input
                        placeholder="password13568*"
                        aria-label="password"
                        type="text"
                        name="password"
                        defaultValue={user.password}
                    />
                </label>
                <label htmlFor='myBrowser1'>
                    <span>Active</span>
                    <input
                        list='browser1'
                        aria-label="active"
                        type="text"
                        name="active"
                        id='myBrowser1'
                        defaultValue={user.active}
                    />
                        <datalist id="browser1">
                            <option value="true"/>
                            <option value="false"/>
                        </datalist>
                </label>
                <label>
                    <span>Date of birth</span>
                    <input
                        placeholder="date_of_birth"
                        aria-label="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        defaultValue={user.date_of_birth}
                    />
                </label>
                <label htmlFor='myBrowser2'>
                    <span>Type</span>
                    <input
                        list='browser2'
                        aria-label="active"
                        type="text"
                        name="type"
                        id='myBrowser2'
                        defaultValue={user.type}
                    />
                        <datalist id="browser2">
                            <option value="teacher"/>
                            <option value="admin"/>
                        </datalist>
                </label>
                
                <div >
                    <button type='submit' className='signupButton'>Sign up</button>
                </div>
                
            </Form>
            <p className=
                { result?.success === true
                 ? 'success'
                 : 'failure'}>
                {result?.message}
            </p>
        </>
    )
}