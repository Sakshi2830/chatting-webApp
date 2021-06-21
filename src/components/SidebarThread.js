import React from 'react'
import { Avatar } from '@material-ui/core'
import "./SidebarThread.css"

const SidebarThread = () => {
    return (
        <div className="sidebarThread">
            <Avatar />
            <div className="sidebarThread__details">
                <h4>Thread Name</h4>
                <p>This is the info</p>
                <small className="sidebarThread__timestamp">TimeStamp</small>
            </div>
        </div>
    )
}

export default SidebarThread
