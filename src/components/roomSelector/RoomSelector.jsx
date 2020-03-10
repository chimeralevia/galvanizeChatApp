import React from "react";
import './RoomSelector.css';

export default function RoomSelector(props) {

  return (
    <div className="room-list">
      <button onClick={props.newRoomHandler}>* new Room *</button>
      {props.rooms.map((r,index) => (
        <button key={index} onClick={()=>props.updateHandler(r)}>{r||"nameless Room"}</button>
      ))}
    </div>
  );
}
