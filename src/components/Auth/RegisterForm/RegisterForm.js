import React from "react";
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from "react-toastify"
import { REGISTER } from "../../../gql/user";
import { useMutation } from '@apollo/client'


const RegisterForm = ({ setShowLogin }) => {

    const [register] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            try {
                const newUser = formData
                delete newUser.repeatPassword

                await register({
                    variables: {
                        input: newUser
                    }
                })
                toast.success('Usuario registrado correctamente')
                setShowLogin(prevState => !prevState)
            } catch (error) {
                toast.error(error.message)
                console.log(error.message);
            }

        }
    })

    return (
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y videos de tus amigos
            </h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                    error={formik.errors.repeatPassword}
                />
                <Button type="submit" className="btn-submit">
                    Registrarse
                </Button>
                {/* <Button type="button" className="btn-submit" onClick={formik.handleReset}>
                    Reiniciar formulario
                </Button> */}
            </Form>
        </>
    );
};

export default RegisterForm;

const initialValues = () => {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    }
}

const validationSchema = () => {
    return Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre de usuario no puede tener espacios").required('Este campo es obligatorio'),
        email: Yup.string().email('Este campo debe ser de tipo email').required('El email es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria')
            .min(4, 'La contraseña debe tener entre 4 y 16 caracteres').max(16, 'La contraseña debe tener entre 4 y 16 caracteres').
            oneOf([Yup.ref('repeatPassword')], 'las contraseñas no son iguales'),
        repeatPassword: Yup.string().required('La contraseña es obligatoria').oneOf([Yup.ref('password')], 'las contraseñas no son iguales'),
    })
}