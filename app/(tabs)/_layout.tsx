import React from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#090909',
          borderTopColor: 'rgba(255,255,255,0.08)',
        },
        tabBarActiveTintColor: '#ff2c6d',
        tabBarInactiveTintColor: '#8c8c8c',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Player' }} />
      <Tabs.Screen name="about" options={{ title: 'Sobre a rádio' }} />
    </Tabs>
  );
}
