import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ListProvider } from './src/context/ListContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ListProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </ListProvider>
  );
}