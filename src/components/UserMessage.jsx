import React, { useState } from "react";
import { IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const UserMessageBox = ({ message }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="user-message-container message-container" 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <div className="user-message">
                { message }
            </div>
        </div>
    );
};

export default UserMessageBox;
