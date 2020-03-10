import React, { Component } from "react";
import MessageView from "../messageView/MessageView";
import RoomSelector from "../roomSelector/RoomSelector";
import ChatMenu from "../chatMenu/ChatMenu";
import "./ChatBox.css";

export default class ChatBox extends Component {
  constructor() {
    super();
    this.state = {
      messageStorage: [],
      selectedRoom: "new room"
    };
    this.updateMessages();
  }

  componentDidMount() {
    setInterval(() => {
      this.updateMessages();
    }, 1500);
  }

  createNewRoom = () => {
    const room = prompt("Please enter the name of the new Room");

    if(!room || room===undefined || room===""){
        return;
    }
    let messageDTO = {
      username: this.props.user,
      text: `Welcome to ${room}, say Hello guys!`,
      roomname: room
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
        this.roomSelectionHandler(room);
      })
      .catch(error => {
        alert("sorry did not work");
      });
  };

  roomSelectionHandler = room => {
    this.setState({
      selectedRoom: room
    });
  };

  updateMessages = () => {
    fetch("https://vw-chatterbox.herokuapp.com/classes/messages")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            messageStorage: result.results
          });
        },
        error => {
          console.log(error);
        }
      );
  };

  generateRoomsList = () => {
    const { messageStorage } = this.state;

    let result = messageStorage.reduce((a, v) => {
      if (!a.includes(v.roomname)) {
        a.push(v.roomname);
      }
      return a;
    }, []);

    return result;
  };

  render() {
    const { messageStorage, selectedRoom } = this.state;

    return (
      <div>
        <h1 id="header">{selectedRoom}</h1>
        <MessageView
          roomname={selectedRoom}
          user={this.props.user}
          messages={messageStorage}
          updateHandler={this.updateMessages}
        />
        <ChatMenu roomname={selectedRoom} user={this.props.user} />
        <RoomSelector
            newRoomHandler={this.createNewRoom}
          rooms={this.generateRoomsList()}
          updateHandler={this.roomSelectionHandler}
        />
      </div>
    );
  }
}
