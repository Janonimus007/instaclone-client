import React from "react";
import { Modal } from "semantic-ui-react"
import "./ModalBasic.scss"

export default function ModalBasic({ show, setShow, title, children }) {

    const onClose = () => {
        setShow(false)
    }

    return (
        <Modal className="modal-basic" size="mini" open={show} onClose={onClose}>
            {title && <Modal.Header>{title}</Modal.Header>}
            {children}
        </Modal>
    );
}
