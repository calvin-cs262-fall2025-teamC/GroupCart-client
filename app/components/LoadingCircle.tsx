import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface LoadingCircleProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * LoadingCircle: A spinning circle component for loading states.
 * Has side effects: Animates continuously using React Native Animated API.
 *
 * @component
 * @param {LoadingCircleProps} props - Component props
 * @param {number} [props.size=60] - Diameter of the circle in pixels
 * @param {string} [props.color="#360479"] - Color of the circle (default: purple)
 * @param {number} [props.strokeWidth=4] - Thickness of the circle stroke
 * @returns {React.ReactElement} The animated loading circle
 *
 * @example
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
