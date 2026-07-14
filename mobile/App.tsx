import React, { useEffect, useRef, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const STREAM_URL = 'https://servidor32-4.brlogic.com:8130/live';

export default function App() {
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
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.phoneFrame}>
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>09:41</Text>
          <Text style={styles.statusText}>●●●</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.ornament} />
          <Text style={styles.eyebrow}>Heavy rock • live stream</Text>
          <Text style={styles.title}>Blackened Pulse</Text>
          <Text style={styles.subtitle}>A cathedral of distortion for midnight souls.</Text>

          <View style={styles.statusPill}>
            <View style={[styles.statusDot, playing && styles.liveDot]} />
            <Text style={styles.statusTextPill}>
              {loading ? 'Connecting...' : playing ? 'Live now' : 'On standby'}
            </Text>
          </View>

          <Pressable
            onPress={togglePlayback}
            style={[styles.playButton, playing && styles.playButtonActive]}
          >
            <Text style={styles.playIcon}>{playing ? '❚❚' : '▶'}</Text>
          </Pressable>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Genre</Text>
              <Text style={styles.infoValue}>Heavy Rock</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Stream</Text>
              <Text style={styles.infoValue}>24/7</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#050505',
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 390,
    padding: 16,
    borderRadius: 32,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  statusText: {
    color: '#d9d9d9',
    fontSize: 12,
  },
  card: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#090909',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  ornament: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: '#b43b5e',
    marginBottom: 16,
    backgroundColor: 'rgba(255,0,76,0.2)',
  },
  eyebrow: {
    color: '#b43b5e',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#f2f2f2',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginBottom: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#666',
    marginRight: 8,
  },
  liveDot: {
    backgroundColor: '#ff2c6d',
  },
  statusTextPill: {
    color: '#f2f2f2',
    fontSize: 13,
  },
  playButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ff2c6d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  playButtonActive: {
    backgroundColor: '#4d4d4d',
  },
  playIcon: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  infoGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  infoBox: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },
  infoLabel: {
    color: '#8c8c8c',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  infoValue: {
    color: '#f2f2f2',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff8ea3',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
});
