import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import "./SidebarThread.css"
import { useDispatch } from 'react-redux'
import { setThread } from '../features/threadSlice'
import db from '../firebase'


const SidebarThread = ({id, threadName}) => {
    const dispatch = useDispatch();
    const [threadInfo, setThreadInfo] = useState("");

    useEffect(() => {
        if(id) {
            db.collection("threads")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setThreadInfo(snapshot.docs.map((doc) => 
                doc.data()))
            );
        }
    }, [])
    return (
        <div className="sidebarThread"
            onClick={() =>
                dispatch(
                    setThread({
                        threadId: id,
                        threadName: threadName,
                    })
                )
            }
        >
            <Avatar src={threadInfo[0]?.photo} />
            <div className="sidebarThread__details">
                <h4>{threadName}</h4>
                <p className="sidebarThread__message">{threadInfo[0]?.messages}</p>
                {/* <p>yo</p> */}
                <small className="sidebarThread__timestamp">
                    {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}

                </small>
            </div>
        </div>
    )
}

export default SidebarThread
