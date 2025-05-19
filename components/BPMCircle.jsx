/* eslint-disable react/no-children-prop */
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { useEffect, useState } from "react";

const BPMCircle = ({ bpm = 0, max = 200, status = "normal" }) => {
  const fill = Math.min((bpm / max) * 100, 100);

  const getStatusColor = () => {
    if (status === "normal") return "#2ecc71";
    if (status === "high") return "#e74c3c";
    if (status === "low") return "#3498db";
    return "#7f8c8d";
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AnimatedCircularProgress
        size={220}
        width={30}
        fill={fill}
        tintColor={getStatusColor()}
        // tintColor="#00e0ff"
        backgroundColor="#3d5875"
        children={() => (
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
        )}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: getStatusColor(),
          marginTop: 10,
        }}
      >
        {status === "normal"
          ? "Normal Heart Rate"
          : status === "high"
          ? "High Heart Rate!"
          : status === "low"
          ? "Low Heart Rate!"
          : "Connecting..."}
      </Text>
    </View>
  );
};

export default BPMCircle;