import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [finalName, setFinalName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setFinalName(event.target.value); // new to me i dont know this before
  }

  let playerName = (
    <>
      <span className="player-name">{finalName}</span>
    </>
  );

  let buttonCaption = "Edit";

  if (isEditing) {
    playerName = (
      <>
        <input
          type="text"
          required
          value={finalName}
          onChange={handleChange}
        ></input>
      </>
    );
    buttonCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonCaption}</button>
    </li>
  );
}
