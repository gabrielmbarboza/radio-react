import { useEffect, useRef, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

const STREAM_URL = 'https://servidor32-4.brlogic.com:8130/live';

export function useRadioStream() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    };

    configureAudio();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const togglePlayback = async () => {
    if (playing) {
      try {
        await soundRef.current?.pauseAsync();
        setPlaying(false);
      } catch (err) {
        setError('Não foi possível pausar a rádio.');
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: STREAM_URL },
          { shouldPlay: true, isLooping: true }
        );
        soundRef.current = sound;
      } else {
        await soundRef.current.playAsync();
      }

      setPlaying(true);
    } catch (err) {
      setError('Não foi possível conectar à rádio.');
    } finally {
      setLoading(false);
    }
  };

  return { playing, loading, error, togglePlayback };
}
