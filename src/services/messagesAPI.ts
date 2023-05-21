import { SendMessageCredentials, SendMessageResponse } from "../shared/components/chat/types";
import { ISender } from "../shared/components/senders/types";
import { API_URL } from "../shared/constants";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
    reducerPath: "messagesApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getLastIncomingMessages: builder.query<ISender[], { idInstance: string; apiTokenInstance: string }>({
            query: ({ apiTokenInstance, idInstance }) =>
                `waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`,
        }),
        sendMessage: builder.mutation<SendMessageResponse, SendMessageCredentials>({
            query: ({ apiTokenInstance, chatId, idInstance, message }: SendMessageCredentials) => ({
                url: `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
                method: "POST",
                body: {
                    chatId,
                    message,
                },
            }),
        }),
    }),
});

export const { useGetLastIncomingMessagesQuery, useSendMessageMutation } = messagesApi;
