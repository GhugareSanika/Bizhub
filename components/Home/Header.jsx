import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 15,
        paddingTop: 10,
        backgroundColor: Colors.BTN,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 80,
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            WelCome,
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              fontFamily: "lato-regular",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 2,
          marginVertical: 10,
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        <Ionicons name="search" size={20} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "lato-regular",
            fontSize: 15,
          }}
        />
      </View>
    </View>
  );
}
