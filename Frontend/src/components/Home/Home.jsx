import React, { useEffect, useRef, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Chat from "../Chat/Chat";
import InputChat from "../Input/Input";
import Header from "../Header/Header";
import ScrollableFeed from "react-scrollable-feed";
import "./Home.css";
import { useChat } from "../../context/ChatContext";

function Home() {
  const [chats, setChats] = useState([]);
  const [mode, setMode] = useState("Online");
  const { selectedChat, setSelectedChat } = useChat();

  async function getChats() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!selectedChat) return;
    try {
      const response = await fetch(`http://localhost:8080/messages/${selectedChat._id}`, {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      const result = await response.json();
      setChats(result);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(selectedChat);

  useEffect(() => {
    getChats();
  }, [selectedChat])

  async function sendMessage(newChat) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const data = {
      text: newChat,
      chatId: selectedChat._id
    }
    try {
      const response = await fetch("http://localhost:8080/messages", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setChats([...chats, result]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Grid templateRows="1.5fr 8fr 1.5fr" height="95vh" gap="10px">
        <GridItem
        >
          <Header />
          {mode == "Offline" && <p style={{ "color": "red", "textAlign": "center", "backgroundColor": "#ffd400", "padding": "6px", "margin": "-10px -20px" }}>You are offline!! Go online to view new chats.</p>}
        </GridItem>

        <GridItem
          className="chatBox"
        >
          <ScrollableFeed>
            {
              [...chats].reverse().map((chat) => {
                return (
                  <Chat key={chat._id} data={chat} />
                )
              })
            }
          </ScrollableFeed>
        </GridItem>

        <GridItem
        >
          <InputChat onSubmit={sendMessage} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Home;






{/* let dateChange = false;
if (index == 0) {
newdate = chat.time.slice(0, 10);
date = newdate;
}
date = newdate;
if (date != chat.time.slice(0, 10)) {
dateChange = true;
newdate = chat.time.slice(0, 10);
} */}
