import React from "react";
import Kanji from "./Kanji";
import { Container } from "reactstrap";

const Kana = ({kana}) => {
    return (
        <div>
            {
                Object.keys(kana).map(
                    kanji => 
                        <Container key={kanji}>
                            <div>{kanji}</div>
                            <Kanji kanji={kana[kanji]}/>
                        </Container>
                        
                )
            }
        </div>
    )
}

export default Kana;