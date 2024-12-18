import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          padding: 12,
          backgroundColor: Colors.ICON_BG,
          borderRadius: 80,
          marginRight: 12,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "lato-Thin",
          textAlign: "center",
          marginTop: 2,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
