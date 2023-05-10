import React from "react";
import { toggleEditModal } from "../slices/kanaSlice";
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

    const showEditModal = useSelector(state => state.kana.showEditModal)
    const dispatch = useDispatch()

    return (
        <CustomCard>
            
        </CustomCard>
    )
}

export default Character;