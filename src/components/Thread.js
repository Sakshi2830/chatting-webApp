import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import "./Thread.css"
import { 
    MicNoneOutlined,
    MoreHoriz,
    SendRounded,
    TimerOutlined,
    EmojiEmotionsOutlined } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import db from '../firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux';
import { selectThreadName, selectThreadId } from '../features/threadSlice'
import { selectUser } from '../features/userSlicecopy'
import Message from './Message'





const Thread = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const threadName = useSelector(selectThreadName);
    const threadId = useSelector(selectThreadId);
    const user = useSelector(selectUser)
    const [notEmpty, setNotEmpty] = useState(false);
    const [selfDestruct, setSelfDestruct] = useState(0);

   useEffect(() => {
       if(threadId) {
           db.collection("threads")
           .doc(threadId)
           .collection('messages')
           .orderBy('timestamp', 'asc')
           .onSnapshot((snapshot) =>
           setMessages(
               snapshot.docs.map((doc) =>({
                   id: doc.id,
                   data: doc.data(),
               }))
           ))
       }
   }, [threadId])

    const sendMessage = (event) => {
        event.preventDefault();
        handleTimeOut(input, user.uid)
        db.collection("threads").doc(threadId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messages: input,
            uid: user.uid,
            photo: user.photo,
            email:user.email,
            displayName: user.displayName,
        });

        //firebase
        setInput('')
    }

    useEffect(() =>{
        if (input !== ""){
            setNotEmpty(true)
        }else{
            setNotEmpty(false);
        }
    }, [input])


    const startTimeOut = (input, uid) => {
        console.log('working');
        db.collection('threads')
        .doc(threadId)
        .collection('messages')
        .where('messages', '==', input)
        .where('uid', '==', uid)
        .get()
        .then((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{
                doc.ref
                .delete()
                .then(() =>{
                   console.log('Message Successfully deleted');
                })
                .catch(function (error){
                    prompt('Error in removing messages: ', error);
                });
            });
        });
    };
   const handleTimeOut = (input, uid) =>{
       console.log(selfDestruct);
       if(selfDestruct !== null && selfDestruct !== '' && selfDestruct !== 0){
        setTimeout(() => startTimeOut(input, uid), parseInt(selfDestruct) *1000)
       }
   };


    return (
        <div className="thread">
            <div className="thread__header">
                <div className="thread__header__contents">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                    <div className="thread__header__contents__info">
                        <h4 id="thread__header">{threadName}</h4>
                        <h5 className="thread__header__contents__info__seen">Last Seen by {user.displayName }-- 
                        { new Date(messages[0]?.data.timestamp?.toDate()).toLocaleString()}
                        </h5>
                    </div>
                </div>
                <IconButton>
                    <MoreHoriz className="thread__header__details"/>
                </IconButton>
            </div>
            
            <div className="thread__messages">
             
                {messages.map(({id, data}) =>(
                    <Message key ={id} data={data}/>
                ))}
                
            </div>
            
            <div className="thread__input">
                    
                <form>
                    <IconButton>
                        <EmojiEmotionsOutlined />
                    </IconButton>
                    <input placeholder="Write a message.." type='text' value={input} onChange={(e) => setInput(e.target.value)}></input>
                    
                    <IconButton  onClick={() =>
                        setSelfDestruct(
                            prompt('Enter the delay in seconds to self destruct the message if not enter 0')
                        )
                    }> 
                        <TimerOutlined/>
                    </IconButton>
                    {(notEmpty && (
                    <IconButton onClick={sendMessage} type="submit">
                        <SendRounded/>
                    </IconButton>
                    ))}
                   
                    <IconButton><MicNoneOutlined/></IconButton>
                

                </form>
            </div>
        </div>
    )
}

export default Thread
