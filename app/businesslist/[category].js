import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlatList } from "react-native";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

export default function BusinessListCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, [category]);

  const getBusinessList = async () => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const fetchedData = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push(doc.data());
    });
    setBusinessList(fetchedData);
  };
  return (
    <View>
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <BusinessListCard business={item} />}
        />
      ) : (
        <Text
          style={{
            fontFamily: "lato-bold",
            fontSize: 20,
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "60%",
          }}
        >
          No business Found
        </Text>
      )}
    </View>
  );
}
