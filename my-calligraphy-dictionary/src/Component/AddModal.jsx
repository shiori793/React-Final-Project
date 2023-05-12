import React, {useRef} from "react";
import { toggleAddModal, addCharacter, searchCharacter, setFormData } from "../slices/kanaSlice";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

const modalStyle = {
    backgroundColor: '#A3B18A',
    color: '#344E41'
}

const buttonStyle1 = {
    backgroundColor: '#588157'
}

const buttonStyle2 = {
    backgroundColor: '#DAD7CD'
}

const inputStyle = {
    backgroundColor: '#DAD7CD',
    color: '#344E41'
}

const fileInputBoxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    backgroundColor: '#DAD7CD'
}

const AddModal = () => {

    const showAddModal = useSelector(state => state.kana.showAddModal);
    const order = useSelector(state => state.kana.order);
    const formData = useSelector(state => state.kana.formData);
    const dispatch = useDispatch()
    const inputRef = useRef(null);

    const handleToggle = () => {
        dispatch(toggleAddModal());
    }

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(addCharacter());
        dispatch(searchCharacter());
        dispatch(toggleAddModal());
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

    const handleClick = () => {
        inputRef.current.click();
    }

    return (
        <Modal isOpen={showAddModal} toggle={handleToggle} style={modalStyle}>
            <ModalHeader toggle={handleToggle}>Add new character</ModalHeader>
            <Form onSubmit={handleSave}>
                <ModalBody>
                    <FormGroup>
                        <Label htmlFor="kana">
                            Kana
                        </Label>
                        <Input
                            id="kana"
                            name="kana"
                            type="select"
                            required
                            onChange={handleChange}
                            value={formData.kana}
                        >
                            {order.map((item, index) => 
                                <option value={item} key={index}>
                                    {item}
                                </option>)}
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
                            required
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
                        <input
                            id="imageData"
                            name="imageData"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            ref={inputRef}
                            hidden
                        />
                        <div onClick={handleClick} style={{backgroundColor: 'gray', width: '200px', height: '200px'}}>
                            {formData.imageData ?
                                <img src={formData.imageData} style={{width: '100%', height:'100%', objectFit: 'contain'}}/>
                                :
                                <AiOutlinePlus />
                            }
                        </div>
                    </FormGroup>                    
                </ModalBody>
                <ModalFooter>
                    <Button style={buttonStyle1} type='submit'>
                        Save
                    </Button>
                    <Button onClick={handleToggle} style={buttonStyle2}>
                        Discard
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default AddModal;
