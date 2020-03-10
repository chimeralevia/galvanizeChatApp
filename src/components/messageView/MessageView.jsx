import React, { Component } from 'react';
import "./MessageView.css";

import MessageSingle from "../messageSingle/MessageSingle";

export default class MessageView extends Component {
  scrollToBottom = () => {
  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
}

componentDidUpdate() {
  this.scrollToBottom();
}

  render() {
    return (
      <div className="message-view">
        {this.props.messages
          .filter(i => i.roomname === this.props.roomname)
          .sort(function(a, b) {
            return a.objectId - b.objectId;
          })
          .map((i, index) => (
            <div key={index} className="message-wrapper">
              <MessageSingle
                user={this.props.user}
                username={i.username}
                text={i.text}
              />
            </div>
          ))}
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}

