import { NavLink, Form, useLoaderData, useActionData } from "react-router-dom"
import { checkAdminRole, tokenHealthStatus } from "../../Auth/UseTokenAuth";
import { createTeacher, doesTheUserIdFromTeacherExists, getTeacherByUserIdFromParams, isTeacherDuplicate } from '../../Helpers/Helpers' 
import '../Signup.css';

export async function action ({ request, params }) {
    const formData = await request.formData();
    const inputs  = Object.fromEntries(formData);
    const email = inputs.email;
    const dni = inputs.dni;
    const userId = inputs.user_id;

    let result = { message: '', success: false};

    // If there are empty values, generate an error code
    Object.values(inputs).includes('')
    ? result.message = 'There are empty fields'
    :
        await isTeacherDuplicate(email, dni).then((res) => res.isDuplicate)
        ? result.message = 'The teacher is already registered in the system'
        : await doesTheUserIdFromTeacherExists(userId).then((res) => !(res.userExists))
            ? result.message = 'The user id does not exists'
            : await getTeacherByUserIdFromParams (userId).then((res) => res != undefined )
                ? result.message = 'The user id is assigned to other teacher'
                :await createTeacher(formData).then(result.success = true );

    if (result.success === true){
        result.message = 'The teacher was created successfully';  
    }
    return result;
}

export async function loader ({ request, params }) {
    await tokenHealthStatus('sign up');
    await checkAdminRole();

    const contact = {
        dni: '',
        name: '',
        last_name: '',  
        date_of_birth: '',
        user_id: ''
    }
    return contact;
}

export default function SignupAdminTeacher () {
    
    const contact = useLoaderData();
    const result = useActionData()
    
    return(
        <>
            <h3>Create Teacher</h3>
            <Form method='post' className='signup'>
                <label>
                    <span>Full Name</span>
                    <input
                        placeholder="John"
                        aria-label="name"
                        type="text"
                        name="name"
                        defaultValue={contact.name}
                    />
                    <input
                        placeholder="Doe"
                        aria-label="last_name"
                        type="text"
                        name="last_name"
                        defaultValue={contact.last_name}
                        />
                </label>
                <label>
                    <span>dni</span>
                    <input
                        placeholder="123456789Z"
                        aria-label="dni"
                        type="text"
                        name="dni"
                        defaultValue={contact.dni}
                    />
                </label>
                <label>
                    <span>Email</span>
                    <input
                        placeholder="example@example.com"
                        aria-label="email"
                        type="text"
                        name="email"
                        defaultValue={contact.email}
                    />
                </label>
                <label>
                    <span>Date of birth</span>
                    <input
                        placeholder="date_of_birth"
                        aria-label="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        defaultValue={contact.date_of_birth}
                    />
                </label>
                <label>
                    <span>User id</span>
                    <input
                        placeholder="1"
                        aria-label="user_id"
                        type="number"
                        name="user_id"
                        defaultValue={contact.user_id}
                    />
                </label>
                <div>
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
