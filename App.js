//import liraries
import React, { Component } from 'react';
import AppNavigation from './src/navigation/AppNavigation'
import { ToastProvider } from 'react-native-toast-notifications';


// create a component
const App = () => {
  return (
    <ToastProvider>
      <AppNavigation />
    </ToastProvider>
  );
};


export default App;
