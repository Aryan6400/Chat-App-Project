import React, { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Grid, GridItem } from "@chakra-ui/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EditIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import "./Header.css";
import { useChat } from "../../context/ChatContext";

function Header() {
    const darkTheme = useSelector((state) => state.darkMode);
    const { selectedChat, setSelectedChat } = useChat();

    return (
        <div className={"header" + (darkTheme ? " dark-theme-font" : "")}>
            <Grid className="name-and-avatar" templateColumns="1fr 10fr 1fr 1fr" gap="0.5rem">
                <GridItem
                    justifySelf="left"
                    alignSelf="center"
                    className="avatar"
                >
                    <Avatar src={selectedChat ? selectedChat.picturePath : ""} />
                </GridItem>
                <GridItem
                    fontSize="1.2rem"
                    paddingLeft=".75rem"
                    className="chatName"
                >
                    <span>{selectedChat ? selectedChat.name : ""}</span>
                </GridItem>
                <GridItem
                    justifySelf="right"
                    alignSelf="center"
                    className="edit-chat-info"
                >
                    <MoreVertIcon fontSize="medium" />
                </GridItem>
                <GridItem
                    justifySelf="right"
                    alignSelf="center"
                    className="chat-options"
                >
                    <EditIcon className="headingIcon" boxSize={25} />
                </GridItem>
            </Grid>
            <hr />
        </div>
    )
}

export default Header;