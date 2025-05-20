"use client"

import { Text } from "@/components/ui/text"
import { useEffect, useState } from "react"
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import HeartbeatAnimation from "../../components/Heart"
import Beat from "../../components/Beat"
import { useUser } from "../context/UserContext"

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useUser()
  const [heartRate, setHeartRate] = useState(102)
  const [heartStatus, setHeartStatus] = useState("")
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [loading, setLoading] = useState(true)

  const fetchBPM = async () => {
    try {
      const response = await fetch("http://192.168.186.193:3000/bpm") // replace with your real API URL
      const json = await response.json()
      if (response.ok) {
        setHeartRate(json.bpm) // Update the state with the 'bpm' value from the response
      } else {
        console.error("Failed to fetch BPM:", json)
      }
    } catch (error) {
      console.error("Error fetching BPM:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBPM()
    const interval = setInterval(fetchBPM, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Check if heart rate is abnormal
    if (heartRate > 100) {
      setHeartStatus("high")
      showAlert("High Heart Rate Detected", `Your heart rate is ${heartRate} BPM, which is above normal range.`)
    } else if (heartRate < 60) {
      setHeartStatus("low")
      showAlert("Low Heart Rate Detected", `Your heart rate is ${heartRate} BPM, which is below normal range.`)
    } else {
      setHeartStatus("normal")
    }
    setLastUpdated(new Date())
  }, [heartRate])

  const showAlert = (title, message) => {
    // In a real app, this would be a push notification
    Alert.alert(title, message)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getStatusColor = () => {
    switch (heartStatus) {
      case "normal":
        return { bg: "bg-emerald-100", border: "border-emerald-500", text: "text-emerald-700" }
      case "high":
        return { bg: "bg-rose-100", border: "border-rose-500", text: "text-rose-700" }
      case "low":
        return { bg: "bg-sky-100", border: "border-sky-500", text: "text-sky-700" }
      default:
        return { bg: "bg-gray-100", border: "border-gray-500", text: "text-gray-700" }
    }
  }

  const getStatusMessage = () => {
    if (heartStatus === "normal") {
      return "Your heart rate is within the normal range (60-100 BPM)."
    } else if (heartStatus === "high") {
      return "Your heart rate is above normal. Consider resting or consulting a doctor if this persists."
    } else {
      return "Your heart rate is below normal. This may be normal for athletes, but consider consulting a doctor if you feel unwell."
    }
  }

  const statusColors = getStatusColor()

  return (
    <SafeAreaView style={styles.container} className=" ">
      <ScrollView className="bg-gray-800 p-6 ">
        {/* Header Section */}
        <View className="mt-10 mb-8 flex items-center">
          <Text className="text-4xl font-bold text-white mb-2">Monitor Your <Text className="text-red-500">Heart Rate</Text></Text>
          <Text className="text-slate-400 text-lg">Your heart health dashboard</Text>
        </View>

        {/* Main Heart Rate Card */}
        <View className="bg-gray-600 rounded-2xl overflow-hidden mb-6  border-2 border-gray-500">
          {/* Heart Animation Section */}
          <View className="mt-10">
            <HeartbeatAnimation bpm={heartRate} status={heartStatus} />
          </View>

         
            <Beat status={heartStatus} />

          {/* Heart Rate Stats */}
          <View className="flex flex-row justify-between px-6 py-4 mt-5">
            <View className="flex-1 items-center border-r border-slate-200 pr-4">
              <Text className="text-slate-100 font-bold text-xl">{formatTime(lastUpdated)}</Text>
              <Text className="text-slate-300 text-sm">Last Updated</Text>
            </View>

            <View className="flex-1 items-center pl-4">
              <Text
                className={`font-bold text-xl ${
                  heartStatus === "normal"
                    ? "text-green-400"
                    : heartStatus === "high"
                      ? "text-rose-600"
                      : "text-sky-600"
                }`}
              >
                {heartStatus === "normal" ? "Normal" : heartStatus === "high" ? "Above Normal" : "Below Normal"}
              </Text>
              <Text className="text-slate-300 text-sm">Heart Rate Status</Text>
            </View>
          </View>

          {/* Status Message */}
          <View className={`mx-6 mb-6 px-4 py-3 rounded-lg ${statusColors.bg} border-l-4 ${statusColors.border}`}>
            <Text className={`${statusColors.text}`}>{getStatusMessage()}</Text>
          </View>
        </View>

        {/* Health Tips Card */}
        <View className="bg-gray-600 rounded-2xl overflow-hidden mb-20 border-2 border-gray-500">
          <View className="px-6 pt-5 bg-gradient-to-r from-purple-500 to-indigo-600">
            <Text className="text-xl font-bold text-gray-100">Health Tips</Text>
          </View>
          <View className="p-6">
            <View className="flex flex-row items-start mb-3">
              <View className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-3"></View>
              <Text className="text-slate-200 flex-1">Stay hydrated throughout the day</Text>
            </View>
            <View className="flex flex-row items-start mb-3">
              <View className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-3"></View>
              <Text className="text-slate-200 flex-1">Aim for 7-8 hours of sleep</Text>
            </View>
            <View className="flex flex-row items-start mb-3">
              <View className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-3"></View>
              <Text className="text-slate-200 flex-1">Regular exercise helps maintain heart health</Text>
            </View>
            <View className="flex flex-row items-start">
              <View className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-3"></View>
              <Text className="text-slate-200  flex-1">Reduce stress through meditation or relaxation</Text>
            </View>
          </View>
        </View>

        {/* BPM History Card - Placeholder for future feature */}
       
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // slate-900
  },
})

export default DashboardScreen
