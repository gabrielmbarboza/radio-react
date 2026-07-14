import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

const GRADIENT_COLORS = ['#050505', '#1a0510', '#050505'] as const;

export function GothicBackground({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      testID="gothic-background-gradient"
      colors={GRADIENT_COLORS}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
