import React from 'react';
import {} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useMakeJsThreadBusy } from '../hooks/useMakeJsThreadBusy';

const circleSize = 45;

const bgColor = '#EA2B1F';

export const DragWithSnap = () => {
  const pos = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };
  //   const offset = {
  //     x: useSharedValue(0),
  //     y: useSharedValue(0),
  //   };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pos.x.value }, { translateY: pos.y.value }],
  }));
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      //   offset.x.value = pos.x.value
      //   offset.y.value = pos.y.value
    })
    .onUpdate(({ translationX, translationY }) => {
      pos.x.value = translationX; // + offset.x.value
      pos.y.value = translationY; // + offset.y.value
    });

  // useMakeJsThreadBusy()

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            backgroundColor: bgColor,
          },
          animatedStyle,
        ]}
      />
    </GestureDetector>
  );
};
