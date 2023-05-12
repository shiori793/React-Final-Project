import React from "react";
import Character from "./Character";
import { Container } from "reactstrap";

const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
}

const Kanji = ({kanji}) => {
    return (
        <Container style={containerStyle}>
            {
                kanji.map(
                    character => 
                        <Character key={character.id} character={character}/>
                )
            }
        </Container>
    )
}

export default Kanji;