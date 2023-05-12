import React from "react";
import Kanji from "./Kanji";
import { Container } from "reactstrap";

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 6fr',
    marginBottom: '1rem'
}

const Kana = ({kana}) => {
    return (
        <div>
            {
                Object.keys(kana).map(
                    kanji => 
                        <Container key={kanji} style={containerStyle}>
                            <h1>{kanji}</h1>
                            <Kanji kanji={kana[kanji]}/>
                        </Container>
                )
            }
        </div>
    )
}

export default Kana;