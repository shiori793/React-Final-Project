import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Input,
    Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateSearchText, toggleAddModal, searchCharacter } from "../slices/kanaSlice";
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlinePlus } from "react-icons/ai";

const inputStyle = {
    backgroundColor: '#A3B18A',
    color: '#344E41',
    borderRadius: '10px',
}

const addModalButtonStyle = {
    backgroundColor: '#DAD7CD',
    color: '#588157',
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    position: 'absolute',
    right: '3%',
}

function Header(args) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const searchText = useSelector(state => state.kana.searchText);
    const dispatch = useDispatch();

    const handleChange = async(e) => {
        const {name, value} = e.target;
        const updateValue = {...searchText, [name]: value};
        await dispatch(updateSearchText(updateValue));
        dispatch(searchCharacter());
    }

    const handleClick = () => {
        dispatch(toggleAddModal())
    }

    return (
        <div>
            <Navbar className='navbar-expand-md px-3' style={{backgroundColor: '#3A5A40'}}>
                <NavbarToggler onClick={toggle} />
                <Button style={addModalButtonStyle} className='d-flex justify-content-align align-items-center justify-self-end' onClick={handleClick}>
                    <AiOutlinePlus />
                </Button>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem className='m-2 me-5'>
                            <Input
                                type='text'
                                name='masterpiece'
                                value={searchText.masterpiece}
                                placeholder='Name of masterpiece'
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </NavItem>
                        <NavItem className='m-2 me-5'>
                            <Input
                                type='text'
                                name='kanji'
                                value={searchText.kanji}
                                placeholder='Chinese character'
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </NavItem>
                        <NavItem className='m-2 me-5'>
                            <Input
                                type='text'
                                name='kana'
                                value={searchText.kana}
                                placeholder='Kana'
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;