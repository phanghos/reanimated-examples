import React from 'react';
import { SafeAreaView } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const colors = ['#fff', '#000'];

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export const ColorInterpolation = () => {
  const val = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(val.value, [0, 1], colors) as string,
  }));
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: val.value === 0 ? colors[1] : colors[0],
  }));
  const tapGesture = Gesture.Tap().onStart(() => {
    val.value = withTiming(1 - val.value);
  });

  return (
    <AnimatedSafeAreaView style={animatedStyle}>
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          style={[
            {
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedStyle,
          ]}
        >
          <Animated.Text
            style={[{ fontSize: 20, fontWeight: 'bold' }, animatedTextStyle]}
          >
            Hello World!
          </Animated.Text>
        </Animated.View>
      </GestureDetector>
    </AnimatedSafeAreaView>
  );
};
