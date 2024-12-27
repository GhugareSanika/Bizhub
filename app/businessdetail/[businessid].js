// import { View, Text, ActivityIndicator, ScrollView } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams } from "expo-router";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../configs/FirebaseConfig";
// import { Colors } from "../../constants/Colors";
// import IntroTemp from "../../components/BusinessDetail/IntroTemp";
// import ActionButton from "../../components/BusinessDetail/ActionButton";
// import About from "../../components/BusinessDetail/About";
// import Reviews from "../../components/BusinessDetail/Reviews";

// export default function businessid() {
//   const [business, setBusiness] = useState();
//   const { businessid } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true); // Default to `true` for initial loading

//   useEffect(() => {
//     getBusinessDetailById();
//   }, []);

//   // Get Business Details by Id
//   const getBusinessDetailById = async () => {
//     try {
//       const docRef = doc(db, "BusinessList", businessid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setBusiness(docSnap.data());
//       } else {
//         console.log("No such document");
//       }
//     } catch (error) {
//       console.error("Error fetching business details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {loading ? (
//         <ActivityIndicator
//           style={{ marginTop: "70%" }}
//           size={"large"}
//           color={Colors.PRIMARY}
//         />
//       ) : (
//         // Use `ScrollView` with `contentContainerStyle` for proper layout
//         <ScrollView
//           style={{ flex: 1, backgroundColor: "#fff" }}
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Intro */}
//           <IntroTemp business={business} />

//           {/* Action Button */}
//           <ActionButton business={business} />

//           {/* About Section */}
//           <About business={business} />

//           {/* Review Section */}
//           <Reviews business={business} />
//         </ScrollView>
//       )}
//     </View>
//   );
// }

import { FlatList, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import IntroTemp from "../../components/BusinessDetail/IntroTemp";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";
import ActionButton from "../../components/BusinessDetail/ActionButton";

export default function businessid() {
  const [business, setBusiness] = useState();
  const { businessid } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBusinessDetailById();
  }, []);

  const getBusinessDetailById = async () => {
    try {
      const docRef = doc(db, "BusinessList", businessid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBusiness({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.error("Error fetching business details:", error);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { key: "Intro", component: <IntroTemp business={business} /> },
    { key: "Actions", component: <ActionButton business={business} /> },
    { key: "About", component: <About business={business} /> },
    { key: "Reviews", component: <Reviews business={business} /> },
  ];

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : (
        <FlatList
          data={sections}
          renderItem={({ item }) => <View>{item.component}</View>}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
        />
      )}
    </View>
  );
}
