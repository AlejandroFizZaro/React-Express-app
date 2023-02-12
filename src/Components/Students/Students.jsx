import { getStudentsByTeacher, getTeacherByUserIdFromToken } from '../Helpers/Helpers';
import { useLoaderData, NavLink } from 'react-router-dom';
import './students.css';
import { tokenHealthStatus } from '../Auth/UseTokenAuth';

export async function action ({ request, params }) {

}

export async function loader ({ request, params }) {
  
  await tokenHealthStatus('students');
  const students = await getStudentsByTeacher().then((res) => { return res });
  const teacher = await getTeacherByUserIdFromToken().then((res) => { return res });
  
  return {students, teacher};
}

export default function Students() {
  
  const {students, teacher} =  useLoaderData();
  
  

  return (
    <>
      <h1>Student list from teacher: {teacher.name} {teacher.last_name}</h1>
        <ul>
          {
          students[0]?.dni
          ?
          students.map((student) => ( 
            <section className="studentBox" key={student.id}>
                <NavLink  to={`${student.id}`}>
                  <table>
                    <tbody>
                      <tr>
                        <td>DNI:</td>
                        <td>{student.dni}</td>
                        <td rowSpan={4} className='delete'>
                          <button>
                            <NavLink to ={`${student.id}/delete`}>
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
                </NavLink>
            </section>   
          ))
          :<p className='studentBox'>There is no students to show</p>}              
        </ul>
    </>
  );
};

