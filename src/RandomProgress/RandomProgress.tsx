import React from 'react';
import { Button, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const height = 100;

const bgColor = '#EA2B1F';

export const RandomProgress = () => {
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value * 250, // withTiming(progress.value * 250)
  }));

  return (
    <>
      <Animated.View
        style={[
          {
            height,
            backgroundColor: bgColor,
            marginHorizontal: 16,
            borderRadius: 8,
          },
          animatedStyle,
        ]}
      />
      <View style={{ marginTop: 24 }}>
        <Button
          title="Animate"
          onPress={() => {
            progress.value = withTiming(Math.random());
          }}
        />
      </View>
    </>
  );
};
