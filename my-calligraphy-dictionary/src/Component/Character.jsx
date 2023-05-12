import React from "react";
import { toggleEditModal, setEditData, setFormData } from "../slices/kanaSlice";
import { useDispatch } from 'react-redux'
import styled from "styled-components";

const CustomCard = styled.div`
    transition: transform 0.2s ease;
    width: 100px;
    height: 100px;
    &:hover{
        transform: scale(1.05);
        cursor: pointer;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Character = ({character}) => {

    const dispatch = useDispatch()

    const handleClick = async () => {
        dispatch(setEditData(character));
        await dispatch(setFormData(character));
        dispatch(toggleEditModal());
    }

    return (
        <CustomCard onClick={handleClick}>
            <img src={character.imageData} alt="Cannot open image file"/>
        </CustomCard>
    )
}

export default Character;