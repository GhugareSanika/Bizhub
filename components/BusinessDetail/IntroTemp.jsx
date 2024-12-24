import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

export default function IntroTemp({ business }) {
  const router = useRouter();
  if (!business) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 8,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <FontAwesome5 name="heart" size={24} color="black" />
      </View>

      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />
      <View
        style={{
          padding: 9,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "lato-bold",
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "lato-regular",
            fontSize: 18,
          }}
        >
          {business.address}
        </Text>
      </View>
    </View>
  );
}
