import React from "react";
import { Grid, Image } from "semantic-ui-react"
import { useQuery } from "@apollo/client"
import "./Profile.scss"
import ImageNotFound from "../../assets/png/avatar.png"
import { GET_USER } from "../../gql/user";
import { UserNotFound } from "../UserNotFound/UserNotFound";

export default function Profile({ username }) {

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username, }
    })

    if (loading) return null
    if (error) return <UserNotFound />

    const { getUser } = data
    console.log(getUser);

    console.log(data);
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={ImageNotFound} avatar />
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
        </>
    );
}
