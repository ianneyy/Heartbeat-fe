import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { View, Text } from 'react-native';

export default function HeartbeatAnimation({bpm = 0, max = 200, status = "normal" }) {
  const fill = Math.min((bpm / max) * 100, 100);
  const animationRef = useRef(null);
 const getStatusColor = () => {
    if (status === "normal") return "#2ecc71";
    if (status === "high") return "#e74c3c";
    if (status === "low") return "#3498db";
    return "#7f8c8d";
  };
  const heartColors = {
    normal: '#2ecc71',   // green
    high: '#e74c3c', // orange
    low: '#3498db', // red
  };

  // Define color filters targeting the main shape layers and their color properties
  const colorFilters = [
    {
      keypath: "heart_red", // Target the layer named 'heart_red'
      color: heartColors[status] || heartColors.normal
    },
     {
      keypath: "heart ", // Target the layer named 'heart '
      color: heartColors[status] || heartColors.normal
    },
    {
      keypath: "stroke 3", // Target the layer named 'stroke 3'
      color: heartColors[status] || heartColors.normal
    },
    {
      keypath: "stroke 2", // Target the layer named 'stroke 2'
      color: heartColors[status] || heartColors.normal
    },
    {
      keypath: "stroke", // Target the layer named 'stroke'
      color: heartColors[status] || heartColors.normal
    },
  ];

  return (
    <View style={{ alignItems: 'center' }}>
      <LottieView
        ref={animationRef}
        source={require('../assets/heart2.json')}
        autoPlay={true}
        loop={true}
        style={{
          width: 150,
          height: 150,
          // tintColor is not used for Lottie animations
        }}
        colorFilters={colorFilters} // Use colorFilters to change colors
      />
      <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: getStatusColor(),
              }}
            >
              {bpm}
            </Text>
            <Text style={{ fontSize: 18, color: "#999" }}>BPM</Text>
          </View>
    </View>
  );
}