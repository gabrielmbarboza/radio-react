import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useAudioMode } from '../hooks/useAudioMode';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { ready } = useAudioMode();

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
