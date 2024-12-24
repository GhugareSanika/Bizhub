import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function About({ business }) {
  if (!business) {
    return <Text>Loading...</Text>;
  }
  return (
    <View
      style={{
        padding: 12,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "lato-bold",
          fontSize: 20,
        }}
      >
        About
      </Text>
      <Text
        style={{
          lineHeight: 25,
        }}
      >
        {business?.about}
      </Text>
    </View>
  );
}
