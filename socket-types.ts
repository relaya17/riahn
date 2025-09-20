export interface ClientToServerEvents {
    authenticate: (data: { userId: string; token?: string }) => void;
    sendMessage: (data: { text: string; chatId: string }) => void;
    typing: (data: { chatId: string; isTyping: boolean }) => void;
    joinGroup: (groupId: string) => void;
    leaveGroup: (groupId: string) => void;
}

export interface ServerToClientEvents {
    authenticated: () => void;
    newMessage: (msg: {
        text: string;
        senderId: string;
        timestamp: string;
        chatId?: string;
    }) => void;
    userTyping: (data: {
        userId: string;
        isTyping: boolean;
        chatId: string;
    }) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    userId?: string;
}
