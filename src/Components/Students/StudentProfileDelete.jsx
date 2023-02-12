import { NavLink, redirect, useLoaderData, Form } from "react-router-dom";
import { deleteStudent, getStudentById } from "../Helpers/Helpers";

export async function action ({ request, params }) {
  await deleteStudent(params.studentId);
  return redirect('/layout/students');
}

export async function loader ({ request, params }) {
  const studentToDelete = await getStudentById(params.studentId).then((res) => {return res});
  if (!studentToDelete){
    throw new Response ('', {
      status:404,
      statusText: 'Not found',
    });
  }
  return {studentToDelete};
}

export default function StudentProfileDelete() {
  const {studentToDelete} = useLoaderData();
  return (
    < >
        <Form method='delete' >
            <section className=''>
              Are you sure? Do you want to delete this student ( {studentToDelete.name} {studentToDelete.last_name} ) ?
              <button type="submit" >Yes</button>
              <NavLink to ={'/layout/students'}>
                <button >No</button>
              </NavLink>
          </section>
        </Form>
        
    </>
  );
};