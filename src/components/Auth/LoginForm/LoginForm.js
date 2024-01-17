import React from "react";
import { Form, Button } from "semantic-ui-react"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import "./LoginForm.scss"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";

const LoginForm = ({ setShowLogin }) => {

    const [login] = useMutation(LOGIN)
    const { setUser, auth } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            try {
                const { data } = await login({
                    variables: {
                        input: formData
                    }
                })
                data.login != null ? toast.success('Usuario inicio sesión correctamente') : toast.error('Usuario o clave invalido')
                const { token } = data.login
                setToken(token)
                setUser(decodeToken(token))
            } catch (error) {
                toast.error(error.message)
                console.log(error.message);
            }
        }
    })

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit} >
            <h2>Entra para ver fotos y videos de tus amigos</h2>
            <Form.Input
                type="text"
                placeholder="Correo electronico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}

            />
            <Form.Input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Button className="btn-submit" type="submit">Iniciar sesión</Button>
        </Form>
    );
};

export default LoginForm;


const initialValues = () => {
    return {
        email: "",
        password: ""
    }
}

const validationSchema = () => {
    return Yup.object({
        email: Yup.string().email("Este campo debe ser de tipo email").required("Este campo es obligatorio"),
        password: Yup.string().required("Este campo es obligatorio")
    })
}