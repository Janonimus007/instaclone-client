import React from "react";
import useAuth from "../../hooks/useAuth";
import "./Home.scss"

export default function Home() {

    const auth = useAuth()
    console.log(auth);

    return <div>
        <h1>
            Asi que estamos en la home de insagram
        </h1>
    </div>;
}
