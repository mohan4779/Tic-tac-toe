import { useState } from "react";

export default function Player({initialName,symbol,isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEdtiting, setIsEdtiting] = useState(false);

    function handleEditClick(){
        setIsEdtiting((editing) => !editing);

       if (isEdtiting){
          onChangeName(symbol,playerName)
       }
        
    }

    function handleChange(event){
        // console.log(event);
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let btnCaption = "Edit";

    if(isEdtiting){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
        btnCaption="Save";
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
               {editablePlayerName}
               <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    )
}