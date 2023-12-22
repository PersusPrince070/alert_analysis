import React, { useState } from "react";
import { IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const BotMessageBox = ({ message }) => {
    const [isHovered, setIsHovered] = useState(false);

    const downloadMessage = () => {
        const blob = new Blob([message], { type: 'text/plain' });
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'chat_message.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="bot-message-container message-container" 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <div className="bot-message">
                <div className="bot-message-wrapper">
                    { message }
                </div>
            </div>
            { isHovered && 
                <IconButton className="bot-message-action-button" onClick={ downloadMessage }>
                    <SaveAltIcon />
                </IconButton>
            }
        </div>
    );
};

export default BotMessageBox;
