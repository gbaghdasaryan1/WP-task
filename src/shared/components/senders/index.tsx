import { useEffect, FC, useCallback } from "react";
import { Sender } from "./components/sender/sender";
import "./senders.scss";
import { useGetLastIncomingMessagesQuery } from "../../../services/messagesAPI";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setSenders } from "../../../redux/reducers/senders/senders-slice";
import { ISender } from "./types";
import { setNewNumber, setSelectedRecipientNumber } from "../../../redux/reducers/tokens/tokens-slice";

export const Senders: FC = () => {
    const dispatch = useAppDispatch();
    const { senders: transformSenders } = useAppSelector(({ senders }) => senders);
    const { idInstance, apiTokenInstance, newNumber } = useAppSelector(({ tokens }) => tokens);
    const { data } = useGetLastIncomingMessagesQuery(
        { idInstance, apiTokenInstance },
        {
            pollingInterval: 5000,
        },
    );

    const handleSetRecipientNumber = useCallback(
        (chatId: string) => {
            dispatch(setSelectedRecipientNumber(chatId));
        },
        [dispatch],
    );

    const filteredData = Array.from(new Set(data?.map((item) => item.senderId))).map((id) => {
        return data?.find((item) => item.senderId === id)!;
    });

    useEffect(() => {
        dispatch(setSenders(filteredData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddNewNumber = () => {
        if (!newNumber.trim()) return;
        const newNumberData: ISender = {
            chatId: newNumber,
            idMessage: "",
            senderId: "",
            senderName: newNumber,
            textMessage: "",
            timestamp: 0,
            typeMessage: "",
            type: "",
        };
        handleSetRecipientNumber(newNumberData.chatId);

        dispatch(setSenders([newNumberData, ...transformSenders]));
        dispatch(setNewNumber(""));
    };

    return (
        <div className="WP-senders">
            <button className="WP-new-message" onClick={handleAddNewNumber}>
                New Message
            </button>
            <div className="WP-add-new-number">
                <input
                    type="text"
                    className="WP-new-number"
                    value={newNumber}
                    onChange={({ target }) => dispatch(setNewNumber(target.value))}
                />
            </div>
            {transformSenders?.map(({ senderName, textMessage, chatId }, index) => {
                return <Sender senderName={senderName} textMessage={textMessage} chatId={chatId} key={index} />;
            })}
        </div>
    );
};
