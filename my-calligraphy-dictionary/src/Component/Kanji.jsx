import React from "react";
import Character from "./Character";

const Kanji = ({kanji}) => {
    return (
        <div>
            {
                kanji.map(
                    character => 
                        <Character key={character.id} character={character}/>
                )
            }
        </div>
    )
}

export default Kanji;