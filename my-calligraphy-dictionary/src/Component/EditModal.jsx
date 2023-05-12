import React, {useRef} from "react";
import { updateCharacter, deleteCharacter, toggleEditModal, searchCharacter, setFormData } from "../slices/kanaSlice";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { AiOutlinePlus } from "react-icons/ai";

const EditModal = () => {

    const showEditModal = useSelector(state => state.kana.showEditModal);
    const formData = useSelector(state => state.kana.formData);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const handleToggle = () => {
        dispatch(toggleEditModal());
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateCharacter())
        await dispatch(searchCharacter());
        dispatch(toggleEditModal());
    }

    const handleDelete = async () => {
        await dispatch(deleteCharacter());
        await dispatch(searchCharacter());
        dispatch(toggleEditModal());
    }

    const handleChange = (e) => {
        const {name, value, files } = e.target;
        if (name === 'imageData'){
            if (files.length > 0) {
                const file = files[0]
                const reader = new FileReader()
                reader.onloadend = () => {
                    dispatch(setFormData({
                        [name]: reader.result
                    }))
                };
                reader.readAsDataURL(file)                
            }
        } else {
            dispatch(setFormData({
                [name] : value
            }))
        }
    }

    const handleClick = () => {
        inputRef.current.click();
    }

    return (
        <Modal isOpen={showEditModal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle} className="modalStyle">Edit character</ModalHeader>
            <Form onSubmit={handleUpdate}>
                <ModalBody className="modalStyle">
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
                            Image *
                        </Label>
                        <input
                            id="imageData"
                            name="imageData"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            ref={inputRef}
                            hidden
                        />
                        <div onClick={handleClick} className='fileInputBoxStyle'>
                            {formData.imageData ?
                                <img src={formData.imageData} />
                                :
                                <AiOutlinePlus />
                            }
                        </div>
                    </FormGroup>                    
                </ModalBody>
                <ModalFooter id="modalStyle" className="d-flex justify-content-center">
                    <Button id="buttonStyle1" type='submit'>
                        Save
                    </Button>
                    <Button onClick={handleDelete} id='buttonStyle2'>
                        Delete
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default EditModal;