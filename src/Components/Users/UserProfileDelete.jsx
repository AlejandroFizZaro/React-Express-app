import { NavLink, redirect, useLoaderData, Form, useActionData } from "react-router-dom";
import { deleteUser, getTeacherByUserIdFromParams, getUserById } from "../Helpers/Helpers";
import { checkTokenUser } from '../Auth/UseTokenAuth';

export async function action ({ request, params }) {
  const userIdToDelete = params.userId;
  const myUserId = await checkTokenUser().then((res) =>  res.id);
  const userIdFromTeacher = await getTeacherByUserIdFromParams(userIdToDelete).then((res) =>  (res?.user_id));
  
  // Error controller. Verifies if the user to delete meet the conditions
  let error = {};
  myUserId == userIdToDelete
  ? error = 'You cannot remove your own user'
  : userIdFromTeacher
    ? error = 'This user cannot be removed if the user is associated to a teacher account'
    : error = '';

  // If the error variable has any value, the error element (below the login button) will render a value 
  if (Object.keys(error).length){
    return error;
  }

  // In case there is no errors, the user removal will run
  try{
    await deleteUser(userIdToDelete);
  }
  catch(err){
      console.log(err);
  }
  return redirect('/layout/users');
  
}

export async function loader ({ request, params }) {
  const userToDelete = await getUserById(params.userId).then((res) => {return res});
  if (!userToDelete){
    throw new Response ('', {
      status:404,
      statusText: 'Not found',
    });
  }
  return {userToDelete};
}

export default function userProfileDelete() {
  const {userToDelete} = useLoaderData();
  const error = useActionData();
  return (
    < >
        <Form method='delete' className='deletemenu' >
            <p>Are you sure? Do you want to delete this user ( {userToDelete.email} ) ?</p>
              <button type="submit" >Yes</button>
              
              <NavLink to ={'/layout/users'}>
                <button >No</button>
              </NavLink>
          <div className="error">
            {error}
          </div>
        </Form>
        
    </>
  );
};