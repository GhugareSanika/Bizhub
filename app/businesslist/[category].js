import { View, Text, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, [category]);

  const getBusinessList = async () => {
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <BusinessListCard business={item} />}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size={"large"}
          color={Colors.PRIMARY}
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
