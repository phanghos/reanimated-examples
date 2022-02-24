import React from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type ChatHeadsProps = {
  headsData: string[];
};

const circleSize = 45;

const { width } = Dimensions.get('window');

const initialPosition = { x: width / 2 - circleSize / 2, y: 50 };

const useNewChatHead = () => ({
  x: useSharedValue(initialPosition.x),
  y: useSharedValue(initialPosition.y),
});

export const ChatHeads = ({ headsData }: ChatHeadsProps) => {
  const heads = headsData.map(_ => useNewChatHead());
  const offset = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };
  const leadAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: heads[0].x.value },
      { translateY: heads[0].y.value },
    ],
  }));

  const head2X = useDerivedValue(() => withSpring(heads[0].x.value));
  const head2Y = useDerivedValue(() => withSpring(heads[0].y.value));
  const style2 = useAnimatedStyle(() => ({
    transform: [{ translateX: head2X.value }, { translateY: head2Y.value }],
  }));

  const head3X = useDerivedValue(() => withSpring(head2X.value));
  const head3Y = useDerivedValue(() => withSpring(head2Y.value));
  const style3 = useAnimatedStyle(() => ({
    transform: [{ translateX: head3X.value }, { translateY: head3Y.value }],
  }));

  const head4X = useDerivedValue(() => withSpring(head3X.value));
  const head4Y = useDerivedValue(() => withSpring(head3Y.value));
  const style4 = useAnimatedStyle(() => ({
    transform: [{ translateX: head4X.value }, { translateY: head4Y.value }],
  }));

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      offset.x.value = heads[0].x.value - initialPosition.x;
      offset.y.value = heads[0].y.value - initialPosition.y;
    })
    .onUpdate(({ translationX, translationY }) => {
      heads[0].x.value = translationX + initialPosition.x + offset.x.value;
      heads[0].y.value = translationY + initialPosition.y + offset.y.value;
    });
  const tapGesture = Gesture.Tap().onStart(() => {
    const pos = { x: 24, y: 48 };
    heads[0].x.value = withTiming(pos.x);
    heads[0].y.value = withTiming(pos.y);
  });

  const styles = [leadAnimatedStyle, style2, style3, style4];

  return (
    <>
      <GestureDetector gesture={Gesture.Exclusive(panGesture, tapGesture)}>
        <>
          {headsData.map((head, index) => (
            <Animated.Image
              key={head}
              source={{ uri: head }}
              style={[
                {
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize,
                  position: 'absolute',
                  zIndex: index === 0 ? 2 : 1,
                },
                styles[index],
              ]}
            />
          ))}
        </>
      </GestureDetector>
    </>
  );
};
