import React, {useRef, useState} from "react";
import { updateCharacter, deleteCharacter, toggleEditModal,toggleAddModal, addCharacter, searchCharacter, setFormData } from "../slices/kanaSlice";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { AiOutlinePlus } from "react-icons/ai";

const UpdateModal = () => {

    const showAddModal = useSelector(state => state.kana.showAddModal);
    const showEditModal = useSelector(state => state.kana.showEditModal);
    const order = useSelector(state => state.kana.order);
    const formData = useSelector(state => state.kana.formData);
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const [fileInputError, setFileInputError] = useState(false);

    const handleToggle = () => {
        showAddModal && dispatch(toggleAddModal());
        showEditModal && dispatch(toggleEditModal());
        setFileInputError(false);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (formData.imageData === '') {
            setFileInputError(true);
            return
        }
        await dispatch(addCharacter());
        await dispatch(searchCharacter());
        dispatch(toggleAddModal());
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
                setFileInputError(false);        
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
        <Modal isOpen={showAddModal || showEditModal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle} className="modalStyle">
                {showAddModal && 'Add new character'}
                {showEditModal && 'Edit character'}
            </ModalHeader>
            <Form onSubmit={showAddModal ? handleSave : handleUpdate}>
                <ModalBody className="modalStyle" >
                    <FormGroup>
                        <Label htmlFor="kana">
                            Kana *
                        </Label>
                        {
                            showAddModal && 
                                <Input
                                    id="kana"
                                    name="kana"
                                    type="select"
                                    required
                                    onChange={handleChange}
                                    value={formData.kana}
                                    style={{backgroundColor: '#DAD7CD', color: '#344E41'}}
                                >
                                    {order.map((item, index) => 
                                        <option value={item} key={index}>
                                            {item}
                                        </option>)}
                                </Input>
                        }
                        {
                            showEditModal &&
                                <Input
                                    id="kana"
                                    name="kana"
                                    type="text"
                                    readOnly
                                    onChange={handleChange}
                                    value={formData.kana}
                                />
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="kanji">
                            Chinese Character *
                        </Label>
                        <Input
                            id="kanji"
                            name="kanji"
                            placeholder="安"
                            type="text"
                            required
                            onChange={handleChange}
                            value={formData.kanji}
                            readOnly={showEditModal}
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
                        <div onClick={handleClick} className='fileInputBoxStyle' style={fileInputError ? {border: 'red 1px solid'} : {}}>
                            {formData.imageData ?
                                <img src={formData.imageData} />
                                :
                                <AiOutlinePlus />
                            }
                        </div>
                        <span style={{color: 'red'}} hidden={!fileInputError}>
                            Please fill in this field
                        </span>
                    </FormGroup>                    
                </ModalBody>
                <ModalFooter id="modalStyle" className="d-flex justify-content-center">
                    <Button type='submit' id="buttonStyle1">
                        Save
                    </Button>
                    <Button onClick={showAddModal ? handleToggle : handleDelete} id='buttonStyle2'>
                        {showAddModal ? 'Discard' : 'Delete'}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default UpdateModal;
