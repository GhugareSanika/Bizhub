import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { collection, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import IntroTemp from "../../components/BusinessDetail/IntroTemp";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";

export default function businessid() {
  const [business, setBusiness] = useState();
  const { businessid } = useLocalSearchParams();
  const [loading, setLoading] = useState();
  useEffect(() => {
    getBusinessDetailById();
  }, []);

  // Get Business Details by Id
  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such a document");
    }
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "70%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}
          <IntroTemp business={business} />

          {/* Action Button */}
          <ActionButton business={business} />

          {/* About Section */}
          <About business={business} />
        </View>
      )}
    </ScrollView>
  );
}
