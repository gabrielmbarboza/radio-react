import { useEffect, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

export function useAudioMode() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      if (!cancelled) {
        setReady(true);
      }
    };

    configureAudio();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ready };
}
