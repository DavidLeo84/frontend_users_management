import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";

const initialUsers = [
    {
        id: 1,
        username: 'pepito',
        password: '123456',
        email: 'pepito@correo.com'
    },
];

const initialUserForm =
{
    id: 0,
    username: '',
    password: '',
    email: ''
};


export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const [visibleForm, setVisibleForm] = useState(false);

    const handlerAddUser = (user) => {

        dispatch({
            type: (user.id === 0) ? 'addUser' : 'updateUser',
            payload: user
        })

        Swal.fire(
            (user.id === 0) ? "Usuario creado" : "Usuario actualizado",
            (user.id === 0) ? "El usuario se ha creado con éxito" : "El usuario se ha actualizado con éxito",
            "success"
        );

        handlerCloseForm();
    };



    const handlerRemoveUser = (id) => {
        console.log(id);

        Swal.fire({
            title: "Esta seguro?",
            text: "¡Cuidado! el usuario sera eliminado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id
                })
                Swal.fire(
                    "¡Usuario eliminado!",
                    "El usuario ha sido eliminado con éxito.",
                    "success"
                );
            }
        });
    };

    const handlerUserSelectedForm = (user) => {

        setVisibleForm(true)
        setUserSelected({ ...user });

    }

    const handlerOpenForm = () => {

        setVisibleForm(true);
    }

    const handlerCloseForm = () => {

        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {

        users,
        userSelected,
        initialUserForm,

        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    }
}
