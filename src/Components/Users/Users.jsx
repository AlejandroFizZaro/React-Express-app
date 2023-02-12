import { getAllUsers } from '../Helpers/Helpers';
import { useLoaderData, NavLink } from 'react-router-dom';
import './Users.css';
import { tokenHealthStatus, checkAdminRole } from '../Auth/UseTokenAuth';

export async function action ({ request, params }) {

}

export async function loader ({ request, params }) {
  await tokenHealthStatus('users');
  await checkAdminRole();
  const users = await getAllUsers().then((res) => {return res});
  return {users};
}

export default function Users() {
  
  const {users} =  useLoaderData();

  return (
    <>
      <h1>User list</h1>
          
        {users[0]?.id
        ?
        users.map((user) => (
          <section className="userBox" key={user.id} >
              <NavLink  to={`${user.id}`}>
                <table>
                  <tbody>
                    <tr>
                      <td>id:</td>
                      <td>{user.id}</td>
                      <td rowSpan={4} className='delete'>
                        <button>
                          <NavLink to ={`${user.id}/delete`}>
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
              </NavLink>
          </section> 
          
        ))
        : < ></>}  
    </>
  );
};

