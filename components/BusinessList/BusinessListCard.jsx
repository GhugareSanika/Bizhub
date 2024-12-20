import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function BusinessListCard({ business }) {
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "lato-bold",
            fontSize: 18,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "lato-regular",
            color: Colors.GRAY,
            fontSize: 15,
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image
            source={require("./../../assets/images/star.png")}
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text style={{ fontFamily: "lato-regular" }}>4</Text>
        </View>
      </View>
    </View>
  );
}
