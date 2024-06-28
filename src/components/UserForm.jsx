import { useEffect, useState } from "react"
import Swal from "sweetalert2";



export const UserForm = ({ userSelected, handlerAddUser, initialUserForm, handlerCloseForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const { id, username, password, email } = userForm;

    useEffect(() => {

        setUserForm({
            ...userSelected,
            password: '',

        })
    }, [userSelected]);

    const onInputChange = ({ target }) => {

        // console.log(target.value)
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    //metodo de captura de los inputs del formulario
    const onSubmit = (event) => {

        event.preventDefault();

        if (!username || (!password && id == 0) || !email) {

            Swal.fire(
                "Error de validación",
                "Debe completar los campos del formulario",
                "Error"
            );
            return;
        }

        // console.log(userForm);

        //
        handlerAddUser(userForm);
        // limpia los inputs despues de guardar los datos
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {

        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (

        <>
            <form onSubmit={onSubmit} className="form form-control">
                <input className="form form-control m-3 w-75"
                    placeholder="Username"
                    name="username"
                    value={username}
                    type="text"
                    onChange={onInputChange} />

                {id > 0 ||
                    <input className="form form-control m-3 w-75"
                        placeholder="password"
                        name="password"
                        value={password}
                        type="password"
                        onChange={onInputChange} />}

                <input className="form form-control m-3 w-75"
                    placeholder="email"
                    name="email"
                    value={email}
                    type="email"
                    onChange={onInputChange} />

                <input type="hidden" name="id" value={id} />

                <button className="btn btn-primary"
                    type="submit"

                >{id > 0 ? 'Editar' : 'Crear'}
                </button>
                <button className="btn btn-danger col mx-2"
                 type="button"
                 onClick={() => onCloseForm()}
                 >Cerrar</button>

            </form>
        </>
    )
}