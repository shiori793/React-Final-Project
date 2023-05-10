import React from "react";
import { toggleAddModal, addCharacter } from "../slices/kanaSlice";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const modalStyle = {
    backgroundColor: '#A3B18A',
    color: '#344E41'
}

const buttonStyle1 = {

}

const buttonStyle2 = {

}

const kanaModal = () => {

    const showAddModal = useSelector(state => state.kana.showAddModal);
    const order = useSelector(state => state.kana.order);
    const dispatch = useDispatch()

    const handleToggle = () => {
        dispatch(toggleAddModal());
    }

    const handleSave = (e) => {
        dispatch(addCharacter())
        dispatch(toggleAddModal)
        e.preventDefault();
    }

    return (
        <Modal isOpen={showAddModal} toggle={handleToggle} {...args} style={modalStyle}>
            <ModalHeader toggle={handleToggle}>Add new character</ModalHeader>
            <ModalBody>
                <Form>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSave} style={buttonStyle1}>
                    Save
                </Button>
                <Button onClick={handleToggle} style={buttonStyle2}>
                    Discard
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default kanaModal;