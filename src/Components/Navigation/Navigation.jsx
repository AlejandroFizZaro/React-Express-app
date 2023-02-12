import useAuth from '../Auth/UseAuth';

export default function Navigation () {
  const { token, onLogout } = useAuth();
  return(
    <nav>
      <navLink to='/login'>Home</navLink>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/admin'>Admin</NavLink>
    {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};