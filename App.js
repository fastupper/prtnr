//import liraries
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation'
import { ToastProvider } from 'react-native-toast-notifications';
import io from 'socket.io-client';

const socket = io('https://prtnrbackend.onrender.com');
// create a component
const App = () => {
  useEffect(() => {
    socket.on('chat message', (message) => {
      console.log('Received message:', message);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);
  return (
    <ToastProvider>
      <AppNavigation />
    </ToastProvider>
  );
};


export default App;
