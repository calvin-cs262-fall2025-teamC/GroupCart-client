import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface LoadingCircleProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * LoadingCircle: A spinning circle component for loading states.
 *
 * Props:
 * - size: diameter of the circle in pixels (default: 60)
 * - color: color of the circle (default: '#360479' purple)
 * - strokeWidth: thickness of the circle stroke (default: 4)
 *
 * Usage:
 * <LoadingCircle size={60} color="#360479" strokeWidth={4} />
 */
export default function LoadingCircle({
  size = 60,
  color = '#360479',
  strokeWidth = 4,
}: LoadingCircleProps) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ rotate: spin }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderColor: color,
            borderWidth: strokeWidth,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 999, // Makes it circular
    borderTopColor: 'transparent', // Create ring effect by making top transparent
    borderRightColor: 'transparent',
  },
});
