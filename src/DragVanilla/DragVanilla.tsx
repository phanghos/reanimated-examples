import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import { useMakeJsThreadBusy } from '../hooks/useMakeJsThreadBusy';

const circleSize = 45;

const bgColor = '#EA2B1F';

export const DragVanilla = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-ignore
          x: pan.x._value,
          // @ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  //   useMakeJsThreadBusy();

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize,
          backgroundColor: bgColor,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
    />
  );
};
