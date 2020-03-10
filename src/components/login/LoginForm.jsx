import React from 'react'

export default function LoginForm(props) {
    
    const logIn = ()=>{
        let input = document.getElementById("username-input").value;
        props.handler(input);
    }

    return (
        <div>
            <input type="text" id="username-input" placeholder="username"/>
            <button onClick={logIn}>Login</button>
        </div>
    )
}
