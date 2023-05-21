import { FC, useCallback } from "react";
import "./sender.scss";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { setSelectedRecipientNumber } from "../../../../../redux/reducers/tokens/tokens-slice";

type Props = {
    senderName: string;
    textMessage: string;
    chatId: string;
};
export const Sender: FC<Props> = ({ senderName, textMessage, chatId }) => {
    const dispatch = useAppDispatch();

    const handleSetRecipientNumber = useCallback(() => {
        dispatch(setSelectedRecipientNumber(chatId));
    }, [chatId, dispatch]);
    return (
        <div className="WP-sender" onClick={handleSetRecipientNumber}>
            <p className="WP-sender-name">{senderName}</p>
        </div>
    );
};
