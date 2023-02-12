import { getStudentById } from '../Helpers/Helpers';
import { useLoaderData, NavLink } from 'react-router-dom';
import './students.css';
import { getTeacherByUserIdFromToken } from '../Helpers/Helpers';

export async function action ({ request, params }) {

}

export async function loader ({ request, params }) {
  const student = await getStudentById(params.studentId).then((res) => {return res});
  const teacherIdFromToken  = await  getTeacherByUserIdFromToken().then((res) => { return res.id});
  const teacherIdFromStudent = student.teacher_id;

  if (!student || teacherIdFromToken!= teacherIdFromStudent ){
    throw new Response ('', {
      status:404,
      statusText: 'The resource was not loaded because this student is not related to your teacher ID',
    });
  }
  return {student};
  
}

export default function StudentProfile() {
  const {student} = useLoaderData();
  return (
    <>
      <h1>Student Profile</h1>
      <section className="studentBox" key={student.id}>
            <table>
              <tbody>
                <tr>
                  <td>DNI:</td>
                  <td>{student.dni}</td>
                  <td rowSpan={4} className='delete'>
                    <button>
                      <NavLink to ={`delete`}>
                        Delete
                      </NavLink> 
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Full Name:</td>
                  <td>{student.name} {student.last_name}</td>
                </tr>
                <tr>
                  <td>Date of Birth:</td>
                  <td>{ (student.date_of_birth).split('T')[0] }</td>
                </tr>
                <tr>
                  <td>Teacher id:</td>
                  <td>{student.teacher_id}</td>
                </tr>
                
              </tbody>
              
            </table>
      </section>  
    </>
  );
};