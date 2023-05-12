import React from "react";
import { updateCharacter, deleteCharacter, toggleEditModal, searchCharacter, setFormData } from "../slices/kanaSlice";
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

const EditModal = () => {

    const showEditModal = useSelector(state => state.kana.showEditModal);
    const editData = useSelector(state => state.kana.editData);
    const formData = useSelector(state => state.kana.formData);
    const dispatch = useDispatch()

    const handleToggle = () => {
        dispatch(toggleEditModal());
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateCharacter())
        dispatch(searchCharacter());
        dispatch(toggleEditModal());
    }

    const handleDelete = () => {
        dispatch(deleteCharacter());
        dispatch(searchCharacter());
        dispatch(toggleEditModal());
    }

    const handleChange = (e) => {
        const {name, value, files } = e.target;
        if (name === 'imageData'){
            console.log(e.target.files)
            if (files.length > 0) {
                const file = files[0]
                const reader = new FileReader()
                reader.onloadend = () => {
                    dispatch(setFormData({
                        [name]: reader.result
                    }))
                };
                reader.readAsDataURL(file)                
            } else {
                dispatch(setFormData({
                    [name] : null
                }))
            }
        } else {
            dispatch(setFormData({
                [name] : value
            }))
        }
    }

    return (
        <Modal isOpen={showEditModal} toggle={handleToggle} style={modalStyle}>
            <ModalHeader toggle={handleToggle}>Edit character</ModalHeader>
            <Form onSubmit={handleUpdate}>
                <ModalBody>
                    <FormGroup>
                        <Label htmlFor="kana">
                            Kana
                        </Label>
                            <Input
                                id="kana"
                                name="kana"
                                type="text"
                                readOnly
                                onChange={handleChange}
                                value={formData.kana}
                            >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="kanji">
                            Chinese Character
                        </Label>
                        <Input
                            id="kanji"
                            name="kanji"
                            placeholder="安"
                            type="text"
                            readOnly
                            onChange={handleChange}
                            value={formData.kanji}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="masterpiece">
                            Name of Masterpiece
                        </Label>
                        <Input
                            id="masterpiece"
                            name="masterpiece"
                            placeholder="高野切第一種"
                            type="text"
                            onChange={handleChange}
                            value={formData.masterpiece}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="imageData">
                            Image
                        </Label>
                        <Input
                            id="imageData"
                            name="imageData"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </FormGroup>                    
                </ModalBody>
                <ModalFooter>
                    <Button style={buttonStyle1} type='submit'>
                        Save
                    </Button>
                    <Button onClick={handleDelete} style={buttonStyle2}>
                        Delete
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default EditModal;