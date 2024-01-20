import React from "react";
import { Container } from "semantic-ui-react"
import Header from "../components/Header";


export const LayoutBasic = ({ children }) => {

    return (
        <>
            <Header />
            <Container>
                {children}
            </Container>
        </>
    );
};
