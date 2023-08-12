import { Avatar } from '@chakra-ui/react';
import "./ChatsBox.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useChat } from '../../../context/ChatContext';


function ChatsBox() {
    const navigate = useNavigate();
    const darkTheme = useSelector((state) => state.darkMode);
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState();
    const {selectedChat, setSelectedChat} = useChat();

    useEffect( () => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);
        async function getChats(){
            const response = await fetch("http://localhost:8080/chats", {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {Authorization: `Bearer ${userInfo.token}`},
                redirect: "follow",
                referrerPolicy: "no-referrer"
            });
            const result = await response.json()
            setChats(result);
            console.log(result);
        }
        getChats();
    }, [])

    return (
        <div className={"panel-chats-container" + (darkTheme ? " dark-theme-font" : "")}>
            <div className="panel-chats-box">
            
                {chats.map((chat) => {
                    let chatName=chat.name;
                    if(!chat.isGroup) {
                        const chatName1 = chat.name.split("+")[0];
                        const chatName2 = chat.name.split("+")[1];
                        if(user.user.name==chatName1) chatName=chatName2;
                        else if(user.user.name==chatName2) chatName = chatName1;
                    }
                    return (
                        <div key={chat._id} className={"chat-box" + (darkTheme ? " dark-chat-box" : "")} onClick={() => {
                            setSelectedChat(chat);
                            navigate("/chat");
                        }}>
                            <div className="chat-avatar">
                                <Avatar src={chat.picturePath} />
                            </div>
                            <div className="chat-name-and-desc">
                                <h3>{chatName}</h3>
                                <div className='last-message'>
                                    {chat.lastMessage ? <p>{chat.lastMessage.sender.name} : {chat.lastMessage.text}</p> : <p>No new message.</p>}
                                    {chat.lastMessage ? <span>{chat.lastMessage.createdAt.split("T")[1].split(".")[0].slice(0,5)}</span> : <span>Today</span>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatsBox;