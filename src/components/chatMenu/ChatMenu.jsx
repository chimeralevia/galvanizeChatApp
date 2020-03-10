import React from "react";
import "./ChatMenu.css";

export default function ChatMenu(props) {
  const sendMessage = () => {
    let messageDTO = {
      username: props.user,
      text: document.getElementById("message-input").value,
      roomname: props.roomname
    };

    fetch("https://vw-chatterbox.herokuapp.com/classes/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageDTO)
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("message-input").value = "";
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="chat-menu">
      <input
        id="message-input"
        className="message-input"
        type="text"
        placeholder="your message"
      />
      <button className="message-send" onClick={sendMessage}> Send </button>
    </div>
  );
}
