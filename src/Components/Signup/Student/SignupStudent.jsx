import { NavLink, Form, useLoaderData, useActionData } from "react-router-dom"
import { checkAdminRole, checkTeacherRole, tokenHealthStatus } from "../../Auth/UseTokenAuth";
import { createStudent, createTeacher, doesTheTeacherIdFromStudentExists, doesTheUserIdFromTeacherExists, getTeacherByUserIdFromParams, isStudentDuplicate, isTeacherDuplicate } from '../../Helpers/Helpers' 
import '../Signup.css';

export async function action ({ request, params }) {
    const formData = await request.formData();
    const inputs  = Object.fromEntries(formData);
    const email = inputs.email;
    const dni = inputs.dni;
    const teacherId = inputs.teacher_id;

    let result = { message: '', success: false};

    // If there are empty values, generate an error code
    Object.values(inputs).includes('')
    ? result.message = 'There are empty fields'
    :
        await isStudentDuplicate(email, dni).then((res) => res.isDuplicate)
        ? result.message = 'The student is already registered in the system'
        : await doesTheTeacherIdFromStudentExists(teacherId).then((res) => (res.teacherDoesntExist))
            ? result.message = 'The teacher id does not exists'
            : await createStudent(formData).then(result.success = true );

    if (result.success === true){
        result.message = 'The student was created successfully';  
    }
    return result;
}

export async function loader ({ request, params }) {
    await tokenHealthStatus('sign up');
    await checkTeacherRole();

    const student = {
        dni: '',
        name: '',
        last_name: '',  
        date_of_birth: '',
        teacher_id: '',
        email: ''
    }
    return student;
}

export default function SignupAdminTeacher () {
    
    const student = useLoaderData();
    const result = useActionData()
    
    return(
        <>
            <h3>Create Student</h3>
            <Form method='post' className='signup'>
                <label>
                    <span>Full Name</span>
                    <input
                        placeholder="John"
                        aria-label="name"
                        type="text"
                        name="name"
                        defaultValue={student.name}
                    />
                    <input
                        placeholder="Doe"
                        aria-label="last_name"
                        type="text"
                        name="last_name"
                        defaultValue={student.last_name}
                        />
                </label>
                <label>
                    <span>dni</span>
                    <input
                        placeholder="123456789Z"
                        aria-label="dni"
                        type="text"
                        name="dni"
                        defaultValue={student.dni}
                    />
                </label>
                <label>
                    <span>Email</span>
                    <input
                        placeholder="example@example.com"
                        aria-label="email"
                        type="text"
                        name="email"
                        defaultValue={student.email}
                    />
                </label>
                <label>
                    <span>Date of birth</span>
                    <input
                        placeholder=""
                        aria-label="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        defaultValue={student.date_of_birth}
                    />
                </label>
                <label>
                    <span>Teacher id</span>
                    <input
                        placeholder="0"
                        aria-label="teacher_id"
                        type="number"
                        name="teacher_id"
                        defaultValue={student.teacher_id}
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
