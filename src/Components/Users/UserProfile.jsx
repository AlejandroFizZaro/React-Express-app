import { getUserById } from '../Helpers/Helpers';
import { useLoaderData, NavLink } from 'react-router-dom';
import './Users.css';

export async function action ({ request, params }) {

}

export async function loader ({ request, params }) {
  const user = await getUserById(params.userId).then((res) => {return res});

  if (!user){
    throw new Response ('', {
      status:404,
      statusText: 'Not found',
    });
  }
  return {user};
  
}

export default function StudentProfile() {
  const {user} = useLoaderData();
  return (
    <>
      <h1>User Profile</h1>
      <section className="studentBox" key={user.id}>
            <table>
              <tbody>
                <tr>
                  <td>
                    id:
                  </td>
                  <td>{user.id}</td>
                  <td rowSpan={4} className='delete'>
                    <button>
                      <NavLink to ={`delete`}>
                        Delete
                      </NavLink> 
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Active:</td>
                  <td>{ user.active== true? 'true':'false' }</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>{user.type}</td>
                </tr>
              </tbody>
            </table>
      </section>  
    </>
  );
};