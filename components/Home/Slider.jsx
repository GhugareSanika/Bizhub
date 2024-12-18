// import { View, Text, FlatList } from "react-native";
// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "./../../configs/FirebaseConfig";

// export default function Slider() {
//   const [sliderList, setSliderList] = useState([]);

//   useEffect(() => {
//     GetSliderList();
//   }, []);

//   const GetSliderList = async () => {
//     setSliderList([]);
//     const q = query(collection(db, "Slider"));
//     const querySnapshot = await getDocs(q);

//     const data = [];
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       setSliderList((prev) => [...prev, doc.data()]);
//     });
//   };
//   return (
//     <View>
//       <Text
//         style={{
//           fontFamily: "lato-bold",
//           fontSize: 20,
//           padding: 20,
//         }}
//       >
//         #Special for you
//       </Text>
//       <FlatList>
//         data={sliderList}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem=
//         {({ item }) => (
//           <Image
//             // source={{ uri: item.imageUrl }}
//             source={{
//               uri: "https:static1.anpoimages.com/wordpress/wp-content/uploads/2023/02/facebook-ap-hero-1-1.jpg",
//             }}
//             style={{
//               width: 300,
//               height: 160,
//             }}
//             onError={() =>
//               console.log(`Failed to load image: ${item.imageUrl}`)
//             }
//           />
//         )}
//       </FlatList>
//     </View>
//   );
// }

import { View, Text, FlatList, Image } from "react-native"; // Ensure Image is imported
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    try {
      setSliderList([]);
      const q = query(collection(db, "Slider"));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        data.push(doc.data());
      });
      setSliderList(data);
    } catch (error) {
      console.error("Error fetching slider list:", error);
    }
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "lato-bold",
          fontSize: 20,
          paddingLeft: 10,
          paddingTop: 10,
          marginBottom: 8,
        }}
      >
        #Special for you
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 10 }}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={{
              width: 250,
              height: 120,
              borderRadius: 15,
              marginRight: 10,
            }}
            onError={() =>
              console.log(`Failed to load image: ${item.imageUrl}`)
            }
          />
        )}
      />
    </View>
  );
}
