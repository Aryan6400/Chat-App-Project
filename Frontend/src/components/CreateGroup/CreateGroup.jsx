import { AddBoxRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import "./CreateGroup.css";

function CreateGroup(){
    const darkTheme = useSelector((state)=>state.darkMode);
    return (
        <div className={"create-group-container" + (darkTheme ? " dark-create-div" : "")}>
            <input type="text" placeholder="Enter group name" className="create-group" />
            <IconButton>
                <AddBoxRounded className={darkTheme ? "dark-theme-font" : ""}/>
            </IconButton>
        </div>
    )
}

export default CreateGroup;