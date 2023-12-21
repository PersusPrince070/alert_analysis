import React, { useContext }from "react";
import { ProductContext } from "../pages/Landing";
import UserMessageBox from '../components/UserMessage';
import BotMessageBox from "../components/BotMessage"

const Body = () => {
    const { message, setMessage } = useContext(ProductContext)
    
    return (
        <div className="body-container">
            {
                message.map((item, idx) => (
                    item.user === "User"
                        ?   <div key={ idx } className="user-message-container">
                                <UserMessageBox message={ item.text }/>
                            </div>
                        :   <div key={ idx } className="bot-message-container">
                                <BotMessageBox message={ item.text }/>
                            </div>
                    )
                )
            }
        </div>
    )
}

export default Body;

