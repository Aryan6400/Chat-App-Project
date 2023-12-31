import React from "react";
import "./Chat.css";
import { Avatar, AvatarBadge, Grid, GridItem } from '@chakra-ui/react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from "react-redux";


function Chat({data}) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    // function formatDate(dateString) {
    //     const [year, month, day] = dateString.split('-');
    //     const months = [
    //         'January', 'February', 'March', 'April', 'May', 'June',
    //         'July', 'August', 'September', 'October', 'November', 'December'
    //     ];
    //     const monthName = months[Number(month) - 1];
    //     return `${day} ${monthName}, ${year}`;
    // }
    const darkTheme = useSelector((state)=>state.darkMode);

    return (
        <div className={"chat-big-box "}>
            <div className={"chat " + (!darkTheme ? "" : "dark-panel")}>
                <Grid templateColumns="1fr 14fr" gap="0.5rem" className={userInfo.user._id == data.sender._id ? "myChats" : "chats"}>
                    <GridItem
                        justifySelf="left"
                        alignSelf="start"
                        className="avatar"
                    >
                        {userInfo.user._id != data.sender._id && <Avatar src={data.sender.picture} >
                            <AvatarBadge >
                                <VerifiedIcon sx={{ fontSize: 11 }} color="primary" />
                            </AvatarBadge>
                        </Avatar>}
                    </GridItem>
                    <GridItem
                        fontSize="1.2rem"
                    >
                        <div className={userInfo.user._id == data.sender._id ? "myChatText" : "chatText"}>
                            {userInfo.user._id != data.sender._id 
                            ? 
                            <div className="sender-name-time">
                                <span>{data.sender.name}</span>
                                <span>{data.createdAt.split("T")[1].split(".")[0].slice(0,5)}</span>
                            </div> 
                            : 
                            <div className="sender-name-time">
                                <span></span>
                                <span>{data.createdAt.split("T")[1].split(".")[0].slice(0,5)}</span>
                            </div> 
                            }
                            <div>{data.text}</div>
                        </div>
                    </GridItem>
                </Grid>
            </div>
            {/* {props.showDateLine && <p><span>{data.createdAt.split("T")[0]}</span></p>} */}
        </div>
    )
}

export default Chat;