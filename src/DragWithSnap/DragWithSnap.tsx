import React from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type DragAndSnapProps = {
  snap?: boolean;
};

const circleSize = 45;

const bgColor = '#EA2B1F';

const { width } = Dimensions.get('window');

const initialPosition = { x: width / 2 - circleSize / 2, y: 50 };

const [transitionDuration, scaleDuration] = [500, 250];

const colors = [bgColor, '#EDAE49'];

const finalScale = 2;

export const DragWithSnap = ({ snap = true }: DragAndSnapProps) => {
  const pos = {
    x: useSharedValue(initialPosition.x),
    y: useSharedValue(initialPosition.y),
  };
  const offset = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: pos.x.value },
      { translateY: pos.y.value },
      { scale: scale.value },
    ],
    backgroundColor: interpolateColor(scale.value, [1, 2], colors),
  }));
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withTiming(finalScale, { duration: scaleDuration });
      offset.x.value = pos.x.value - initialPosition.x;
      offset.y.value = pos.y.value - initialPosition.y;
    })
    .onUpdate(({ translationX, translationY }) => {
      pos.x.value =
        translationX + initialPosition.x + (snap ? 0 : offset.x.value);
      pos.y.value =
        translationY + initialPosition.y + (snap ? 0 : offset.y.value);
    })
    .onEnd(() => {
      if (snap) {
        pos.x.value = withTiming(initialPosition.x, {
          duration: transitionDuration,
        });
        pos.y.value = withTiming(initialPosition.y, {
          duration: transitionDuration,
        });
      }
    })
    .onFinalize(() => {
      scale.value = withTiming(1, { duration: scaleDuration });
    });

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
