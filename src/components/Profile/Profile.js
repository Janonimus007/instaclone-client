import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react"
import { useQuery } from "@apollo/client"
import "./Profile.scss"
import ImageNotFound from "../../assets/png/avatar.png"
import { GET_USER } from "../../gql/user";
import userAuth from "../../hooks/useAuth"
import { UserNotFound } from "../UserNotFound/UserNotFound";
import ModalBasic from "../Modal/ModalBasic/ModalBasic";
import AvatarForm from "../User/AvatarForm";

export default function Profile({ username }) {

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username, }
    })
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);
    const { auth } = userAuth()

    if (loading) return null
    if (error) return <UserNotFound />
    const { getUser } = data

    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto del perfil")
                setChildrenModal(<AvatarForm setShowModal={setShowModal} />)
                setShowModal(true)
                console.log(getUser);

                break;

            default:
                break;
        }

    }

    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={ImageNotFound} avatar onClick={() => username === auth.username && handlerModal("avatar")} />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <div>
                        header profile
                    </div>
                    <div>
                        publicaciones hechas, personas que nos siguen y seguimos
                    </div>
                    <div className="other">
                        <p className="name">{getUser.name ? getUser.name : "sin nombre"}</p>
                        <p>{getUser.siteWeb ? (<a className="siteWeb" href={getUser.siteWeb} target="_blank" />) : "Agregar sitio web"}</p>
                        {getUser.description && (
                            <p>{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>

            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
    );
}
