/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragWithSnap } from './src/DragWithSnap/DragWithSnap';
import { DragVanilla } from './src/DragVanilla/DragVanilla';
import { ChatHeads } from './src/ChatHeads/ChatHeads';

const chatHeads = [
  'https://scontent-ecv1-1.xx.fbcdn.net/v/t1.6435-9/122180141_10158715901282184_8344326636632682160_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=0XR1V33BXL4AX-BgD6z&_nc_ht=scontent-ecv1-1.xx&oh=00_AT-LxqjQCdyZzgzc98czz-NtQhV_xOicRtGjcl1oWxPbUw&oe=622D4A08',
  'https://scontent-ecv1-1.xx.fbcdn.net/v/t1.6435-9/119971803_10158636516717184_7697580780002677165_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=cbmmT4rGpngAX9LWwSU&tn=O24BpYCBJUoTX8-N&_nc_ht=scontent-ecv1-1.xx&oh=00_AT_kRjpuUTNhQl1G-7lrDdBYzpfKuYuWgQD9PxyaxpkJXg&oe=622C9EF2',
  'https://scontent-ecv1-1.xx.fbcdn.net/v/t1.6435-9/64542226_10157168004612184_310173608880111616_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=4-M6PmhVW70AX_cf3P3&tn=O24BpYCBJUoTX8-N&_nc_ht=scontent-ecv1-1.xx&oh=00_AT8PMRCay_81F4WgKk7nMLEVvh8PZ3vU355dVoW6uBCxUA&oe=622EEBF3',
  'https://scontent-ecv1-1.xx.fbcdn.net/v/t1.6435-9/53566800_10156938543987184_6141972429221658624_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=RyWX0Y83-DUAX9jRbwi&_nc_ht=scontent-ecv1-1.xx&oh=00_AT9Ifj5vkKg7CHUmoIGO0BUY-rbnJ6x8_a7an55sXTv4MA&oe=622CDD05',
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ChatHeads headsData={chatHeads} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
