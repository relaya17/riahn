export interface ClientToServerEvents {
    authenticate: (data: { userId: string; username: string }) => void;
    sendMessage: (data: { content: string; chatId: string }) => void;
    typing: (data: { chatId: string; isTyping: boolean }) => void;
    joinGroup: (groupId: string) => void;
    leaveGroup: (groupId: string) => void;
}

export interface ServerToClientEvents {
    authenticated: () => void;
    newMessage: (msg: {
        content: string;
        senderId: string;
        timestamp: string;
        chatId: string;
    }) => void;
    userTyping: (data: {
        userId: string;
        chatId: string;
        isTyping: boolean;
    }) => void;
    usersInRoom: (data: { chatId: string; users: string[] }) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    userId?: string;
    username?: string;
}
