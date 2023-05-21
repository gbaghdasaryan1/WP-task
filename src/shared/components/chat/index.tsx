import { useState } from "react";
import "./chat.scss";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useGetLastIncomingMessagesQuery, useSendMessageMutation } from "../../../services/messagesAPI";
import { convertTimestampToDateFormat } from "../../helpers";

const Chat = () => {
    const [message, setMessage] = useState("");
    const { selectedRecipientNumber, apiTokenInstance, idInstance } = useAppSelector(({ tokens }) => tokens);
    const [sendMessage] = useSendMessageMutation();
    const { data } = useGetLastIncomingMessagesQuery(
        { idInstance, apiTokenInstance },
        {
            pollingInterval: 5000,
        },
    );
    const filtered = data?.filter((msg) => msg.chatId === selectedRecipientNumber);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        await sendMessage({
            apiTokenInstance,
            idInstance,
            chatId: selectedRecipientNumber,
            message,
        });
        setMessage("");
    };

    console.log(data);

    return (
        <div className="WP-chat">
            <h1>{selectedRecipientNumber}</h1>
            <div className="WP-messages">
                {filtered?.map(({ textMessage, timestamp }, index) => {
                    return (
                        <p key={index} className="WP-selected-contact-message">
                            <span className="WP-selected-contact-message-text">{textMessage}</span>
                            <span className="WP-selected-contact-date">{convertTimestampToDateFormat(timestamp)}</span>
                        </p>
                    );
                })}
            </div>

            <div>
                <label htmlFor="message" className="WP-message-input">
                    <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={handleSendMessage}>Send</button>
                </label>
            </div>
        </div>
    );
};

export default Chat;
