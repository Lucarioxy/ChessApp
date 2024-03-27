import { useState, useEffect } from 'react';
import { socket } from '../../../utils/socket';
import { ConnectionState } from '../socket/ConnectionState';
import { ConnectionManager } from '../socket/ConnectionManager';
import { Events } from '../socket/Events';
import { MyForm } from '../socket/MyForm';

export default function SocketRough() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return (
        <div className="App">
            <ConnectionState isConnected={isConnected} />
            <Events events={fooEvents} />
            <ConnectionManager />
            <MyForm />
        </div>
    );
}