import React from "react";

const BotMessageBox  = ({ message }) => {

    return (
        <div className="bot-message">
            <div className="bot-message-wrapper">
                {
                    message
                }
            </div>
        </div>
    )
} 

export default BotMessageBox;