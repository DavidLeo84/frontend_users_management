import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {

    isAuth: false,
    user: undefined
}

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const handlerLogin = ({ username, password }) => {

        const isLogin = loginUser({ username, password })
        if(isLogin) {
            const user = { username: 'admin' }
            dispatch({
                type: 'login',
                payload: user
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user
            }));
        } else {
            Swal.fire(
                'Error Login',
                'Username o Password son invalidos y/o requeridos',
                'error');
        }
    }

    const handlerLogout = () => {

        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
    }

    return {

        login,
        handlerLogin,
        handlerLogout

    }
}
