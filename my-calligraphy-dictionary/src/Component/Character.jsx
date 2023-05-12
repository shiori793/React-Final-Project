import React from "react";
import { toggleEditModal, setEditData, setFormData } from "../slices/kanaSlice";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

const CustomCard = styled.div`
    transition: transform 0.2s ease;
    &:hover{
        transform: scale(1.1);
        cursor: pointer;
    }
`;

const Character = ({character}) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setEditData(character));
        dispatch(setFormData(character));
        dispatch(toggleEditModal());
    }

    return (
        <CustomCard onClick={handleClick}>
            <img src={character.imageData} alt="Cannot open image file"/>
        </CustomCard>
    )
}

export default Character;