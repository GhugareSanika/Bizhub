import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      setCategoryList([]); // Clear the list before fetching
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);

      const categories = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data()); // Log the fetched data
        categories.push({ id: doc.id, ...doc.data() }); // Add unique ID
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "lato-bold",
          }}
        >
          Category
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "lato-bold",
          }}
        >
          View All
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 10,
        }}
        data={categoryList}
        keyExtractor={(item) => item.id} // Use unique IDs as keys
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onCategoryPress={(category) =>
              router.push("/businesslist/" + item.name)
            }
          />
        )}
      />
    </View>
  );
}
