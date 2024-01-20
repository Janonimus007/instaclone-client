import React from "react";
import { Image, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import useAuth from "../../../hooks/useAuth";
import AvatarNotFound from "../../../assets/png/avatar.png"
import "./RightHeader.scss"

const RightHeader = () => {
    const { username, id } = useAuth().auth
    console.log(username, ' Este es el id ', id)
    return (
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                <Icon name="plus" />
                <Link to={`/${username}`}>
                    <Image src={AvatarNotFound} avatar />
                </Link>

            </div>
        </>
    );
};

export default RightHeader;
