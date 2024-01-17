import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react"
import instaclone from "../../assets/png/instaclone.png"
import "./Auth.scss"
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";

const Auth = () => {
    const [showLogin, setshowLogin] = useState(true);

    const changeFormLogin = () => {
        setshowLogin(prevState => !prevState)
    }

    return <Container fluid className="auth">
        <Image src={instaclone} />
        <div className="container-form">
            {showLogin ? <LoginForm setShowLogin={setshowLogin} /> : <RegisterForm setShowLogin={setshowLogin} />}
        </div>

        <div className="change-form">
            <p>

                {
                    showLogin ? (
                        <>
                            ¿No tienes cuenta?
                            <span onClick={changeFormLogin}>Registrate</span>
                        </>
                    ) : (
                        <>
                            ¡Entra con tu cuenta!
                            <span onClick={changeFormLogin}>Iniciar Sesión</span>
                        </>
                    )
                }
            </p>

        </div>

    </Container>;
};

export default Auth;
