import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { View, Text } from 'react-native';

export default function Beat({status = "normal" }) {
  const animationRef = useRef(null);

  const heartColors = {
    normal: '#2ecc71',   // green
    high: '#e74c3c', // orange
    low: '#3498db', // red
  };

  // Define color filters targeting the main shape layers and their color properties
  const colorFilters = [
    {
      keypath: "yellow.Shape 1.Stroke 1", // Target the layer named 'heart_red'
      color: heartColors[status] || heartColors.normal
    },
     
  ];

  return (
    <View style={{ alignItems: 'center' }}>
      <LottieView
        ref={animationRef}
        source={require('../assets/beat.json')}
        autoPlay={true}
        loop={true}
        style={{
          width: 250,
          height: 150,
          // tintColor is not used for Lottie animations
        }}
        colorFilters={colorFilters} // Use colorFilters to change colors
      />
      
    </View>
  );
}