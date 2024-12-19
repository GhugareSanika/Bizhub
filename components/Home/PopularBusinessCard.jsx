import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function PopularBusinessCard({ business }) {
  return (
    <View
      style={{
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: 180,
          height: 80,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7, gap: 5 }}>
        <Text
          style={{
            fontFamily: "lato-bold",
            fontSize: 14,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "lato-regular",
            fontSize: 13,
            color: Colors.GRAY,
          }}
        >
          {business.address}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
        <Text
          style={{
            fontFamily: "lato-regular",
            backgroundColor: Colors.BTN,
            color: "#fff",
            padding: 3,
            fontSize: 10,
            borderRadius: 5,
          }}
        >
          {business.category}
        </Text>
      </View>
    </View>
  );
}
