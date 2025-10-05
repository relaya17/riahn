import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from '../socket-types';

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const useSocket = () => {
    const socketRef = useRef<TypedSocket | null>(null);

    useEffect(() => {
        const socketUrl = process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin
            : 'http://localhost:3000';

        const socket: TypedSocket = io(socketUrl, {
            transports: ['websocket'],
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('✅ Connected to server:', socket.id);
        });

        socket.on('authenticated', () => {
            console.log('🔐 Authenticated');
        });

        socket.on('newMessage', (msg) => {
            console.log('📩 New message:', msg);
        });

        socket.on('userTyping', (data) => {
            console.log('⌨️ User typing:', data);
        });

        socket.on('usersInRoom', (data) => {
            console.log('👥 Users in room:', data);
        });

        socket.on('disconnect', (reason) => {
            console.log('❌ Disconnected:', reason);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const authenticate = (userId: string, username: string) => {
        socketRef.current?.emit('authenticate', { userId, username });
    };

    const sendMessage = (chatId: string, content: string) => {
        socketRef.current?.emit('sendMessage', { chatId, content });
    };

    const setTyping = (chatId: string, isTyping: boolean) => {
        socketRef.current?.emit('typing', { chatId, isTyping });
    };

    const joinGroup = (groupId: string) => {
        socketRef.current?.emit('joinGroup', groupId);
    };

    const leaveGroup = (groupId: string) => {
        socketRef.current?.emit('leaveGroup', groupId);
    };

    return {
        authenticate,
        sendMessage,
        setTyping,
        joinGroup,
        leaveGroup,
    };
};
