import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlicecopy'
import { Avatar } from '@material-ui/core';
import "./Messages.css"

const Message = ({id, data: {timestamp, displayName, email, messages, photo, uid}} ) => {
     const user = useSelector(selectUser);

    return (
        <div className={`message ${user.email === email && `message__sender`}`} >
            <Avatar src={photo} className="message__photo" />
            <div className="message__content">
                
                <p>{messages}</p>
                
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
        </div>
    )
}

export default Message
