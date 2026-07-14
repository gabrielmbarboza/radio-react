import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const BAR_COUNT = 5;
const IDLE_SCALE = 0.3;

type Props = {
  playing: boolean;
};

export function SoundWave({ playing }: Props) {
  const barValues = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(IDLE_SCALE))
  ).current;
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    if (playing) {
      const animations = barValues.map((value, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 300 + index * 80,
              useNativeDriver: false,
            }),
            Animated.timing(value, {
              toValue: IDLE_SCALE,
              duration: 300 + index * 80,
              useNativeDriver: false,
            }),
          ])
        )
      );

      animationsRef.current = animations;
      animations.forEach((animation) => animation.start());
    } else {
      animationsRef.current.forEach((animation) => animation.stop());
      animationsRef.current = [];
      barValues.forEach((value) => value.setValue(IDLE_SCALE));
    }

    return () => {
      animationsRef.current.forEach((animation) => animation.stop());
    };
  }, [playing, barValues]);

  return (
    <View style={styles.container} testID="sound-wave">
      {barValues.map((value, index) => (
        <Animated.View
          key={index}
          testID={`sound-wave-bar-${index}`}
          style={[styles.bar, { transform: [{ scaleY: value }] }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 24,
    gap: 4,
  },
  bar: {
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: '#ff2c6d',
  },
});
