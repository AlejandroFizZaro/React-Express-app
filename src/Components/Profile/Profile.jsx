import { useLoaderData } from "react-router-dom";
import { checkTokenUser, isTokenExpired, localToken, removeToken, tokenHealthStatus } from '../Auth/UseTokenAuth';
import './Profile.css';

export async function action ({ request, params }) {
    
}

export async function loader ({ request, params }) {
    await tokenHealthStatus('profile');
    const user = await checkTokenUser().then((res) => {return (res)});

    return {user} ;
}

export default function Profile () {
    const {user} = useLoaderData();
    return (
        <>
            <h1>Profile</h1>
            <section className="userBox">
                <table>
                    <tbody>
                      <tr>
                        <td>User id:</td>
                        <td>{user.id}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>Active:</td>
                        <td>{user.active == true? 'true':'false'}</td>
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