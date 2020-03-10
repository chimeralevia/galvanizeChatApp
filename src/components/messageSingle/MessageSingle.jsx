import React from 'react'
import "./MessageSingle.css";

export default function MessageSingle(props) {
    return (
    <div className={props.user===props.username?"ownMessage message":"message"}>
        <p className="username">{props.username}</p>
        <p className="text">{props.text}</p>
    </div>
    )
}
