/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { useUser } from "../context/UserContext";
import BPMCircle from "../../components/BPMCircle";

// Heart rate component with animation


const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useUser();
  const [heartRate, setHeartRate] = useState(0);
  const [heartStatus, setHeartStatus] = useState("normal");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  const fetchBPM = async () => {
    try {
      const response = await fetch("http://192.168.186.193:3000/bpm"); // replace with your real API URL
      const json = await response.json();
      if (response.ok) {
        setHeartRate(json.bpm); // Update the state with the 'bpm' value from the response
      } else {
        console.error("Failed to fetch BPM:", json);
      }
    } catch (error) {
      console.error("Error fetching BPM:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBPM();
    const interval = setInterval(fetchBPM, 500);
    return () => clearInterval(interval);
  }, []);
  
  // Simulate IoT device sending heart rate data
  useEffect(() => {
    // fetchBPM();

    // const interval = setInterval(fetchBPM, 500); // fetch every 5 seconds


    // Check if heart rate is abnormal
    if (heartRate > 100) {
      setHeartStatus("high");
      showAlert(
        "High Heart Rate Detected",
        `Your heart rate is ${heartRate} BPM, which is above normal range.`
      );
    } else if (heartRate < 60) {
      setHeartStatus("low");
      showAlert(
        "Low Heart Rate Detected",
        `Your heart rate is ${heartRate} BPM, which is below normal range.`
      );
    } else {
      setHeartStatus("normal");
    }
    setLastUpdated(new Date());

    // }, 5000); // Update every 5 seconds

  
  }, [heartRate]);

  const showAlert = (title, message) => {
    // In a real app, this would be a push notification
    Alert.alert(title, message);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>
          <Text style={styles.subtitleText}>Your heart health dashboard</Text>
        </View>

        <BPMCircle bpm={heartRate} status={heartStatus} />

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Last Updated</Text>
          <Text style={styles.infoCardValue}>{formatTime(lastUpdated)}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Heart Rate Status</Text>
          <Text
            style={[
              styles.infoCardValue,
              heartStatus === "normal"
                ? styles.normalText
                : heartStatus === "high"
                ? styles.highText
                : styles.lowText,
            ]}
          >
            {heartStatus === "normal"
              ? "Normal"
              : heartStatus === "high"
              ? "Above Normal"
              : "Below Normal"}
          </Text>
          <Text style={styles.infoCardDescription}>
            {heartStatus === "normal"
              ? "Your heart rate is within the normal range (60-100 BPM)."
              : heartStatus === "high"
              ? "Your heart rate is above normal. Consider resting or consulting a doctor if this persists."
              : "Your heart rate is below normal. This may be normal for athletes, but consider consulting a doctor if you feel unwell."}
          </Text>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsCardTitle}>Health Tips</Text>
          <Text style={styles.tipItem}>• Stay hydrated throughout the day</Text>
          <Text style={styles.tipItem}>• Aim for 7-8 hours of sleep</Text>
          <Text style={styles.tipItem}>
            • Regular exercise helps maintain heart health
          </Text>
          <Text style={styles.tipItem}>
            • Reduce stress through meditation or relaxation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#3498db",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerButtons: {
    flexDirection: "row",
  },
  profileButton: {
    marginRight: 10,
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  profileButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitleText: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 5,
  },
  heartRateContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  heartRateCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  bpmText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  bpmLabel: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  infoCardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  infoCardDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
  },
  normalText: {
    color: "#2ecc71",
  },
  highText: {
    color: "#e74c3c",
  },
  lowText: {
    color: "#3498db",
  },
  tipsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipsCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 14,
    color: "#2c3e50",
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default DashboardScreen;
