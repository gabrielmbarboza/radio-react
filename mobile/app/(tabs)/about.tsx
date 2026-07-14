import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GothicBackground } from '../../components/GothicBackground';

export default function AboutScreen() {
  return (
    <GothicBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Heavy rock • live stream</Text>
          <Text style={styles.title}>Blackened Pulse</Text>
          <Text style={styles.paragraph}>
            A cathedral of distortion for midnight souls. Blackened Pulse transmite heavy rock
            sem parar, todos os dias, para quem busca peso, atmosfera e devoção sonora a
            qualquer hora da noite.
          </Text>
          <Text style={styles.paragraph}>
            Transmissão ao vivo, 24 horas por dia, 7 dias por semana — sem playlists engessadas,
            só a pulsação constante de riffs pesados.
          </Text>

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
    </GothicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 390,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(9,9,9,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
    marginBottom: 16,
  },
  paragraph: {
    color: '#b3b3b3',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 8,
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
});
