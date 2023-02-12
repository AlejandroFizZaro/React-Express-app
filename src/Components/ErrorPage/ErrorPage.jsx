import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return(
        <div className="errorBox">
            <h1>
                Ooopsie wooopsie!
            </h1>
            <p>Sorry, an unexpected error has occurred</p>
            <p>
                {error.statusText || error.message}
            </p>
            <button className="errorButton">
                <NavLink to={'/'}>Go to Login</NavLink>
            </button>
            
        </div>
    )
}