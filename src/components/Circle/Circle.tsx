import 'react-native-reanimated';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { canvas2Polar } from 'react-native-redash';
import Svg, { Circle as SvgCircle } from 'react-native-svg';

type CircleProps = {};

const { width } = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 45;
const r = size / 2;
const defaultTheta = canvas2Polar({ x: 0, y: 0 }, { x: r, y: r }).theta;

export const Circle = (props: CircleProps) => {
  return (
    <>
      <View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'red' }}
      />
      <Svg>
        <SvgCircle
          cx={r}
          cy={r}
          r={r - strokeWidth / 2}
          stroke="green"
          {...{ strokeWidth }}
        />
      </Svg>
    </>
  );
};
