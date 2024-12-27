// import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
// import React from "react";
// import { FlatList } from "react-native";

// export default function ActionButton({ business }) {
//   const actionButtonmenu = [
//     {
//       id: 1,
//       name: "Call",
//       icon: require("./../../assets/images/phone.png"),
//       url: "tel:" + business?.contact,
//     },
//     {
//       id: 2,
//       name: "Location",
//       icon: require("./../../assets/images/location.png"),
//       url:
//         "https://www.google.com/maps/@16.211406,74.3893121,14z?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" +
//         business?.address,
//     },
//     {
//       id: 3,
//       name: "Web",
//       icon: require("./../../assets/images/web.png"),
//       url: business?.website,
//     },
//     {
//       id: 4,
//       name: "Share",
//       icon: require("./../../assets/images/share.png"),
//       url: business?.share,
//     },
//   ];

//   const onPresshandle = (item) => {
//     if (item.name == "share") {
//       return;
//     }
//     Linking.openURL(item.url);
//   };
//   return (
//     <View
//       style={{
//         backgroundColor: "white",
//         padding: 20,
//       }}
//     >
//       <FlatList
//         data={actionButtonmenu}
//         numColumns={4}
//         columnWrapperStyle={{ justifyContent: "space-between" }}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity key={index} onPress={() => onPresshandle(item)}>
//             <Image
//               source={item?.icon}
//               style={{
//                 width: 35,
//                 height: 35,
//               }}
//             />
//             <Text
//               style={{
//                 fontFamily: "lato-regular",
//                 textAlign: "center",
//                 marginTop: 3,
//               }}
//             >
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//         nestedScrollEnabled // Important to avoid conflicts
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );
// }

import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { FlatList } from "react-native";

export default function ActionButton({ business }) {
  const actionButtonmenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/phone.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/location.png"),
      url: "https://www.google.com/maps?q=" + business?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("./../../assets/images/web.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: business?.share,
    },
  ];

  const onPresshandle = (item) => {
    if (item.name === "Share") {
      return; // Handle share separately if needed
    }
    Linking.openURL(item.url);
  };

  return (
    <View style={{ backgroundColor: "white", padding: 20 }}>
      <FlatList
        data={actionButtonmenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPresshandle(item)}>
            <Image
              source={item?.icon}
              style={{
                width: 35,
                height: 35,
              }}
            />
            <Text
              style={{
                fontFamily: "lato-regular",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Use a unique key
        nestedScrollEnabled // Enables proper nesting
        showsVerticalScrollIndicator={false} // Hides unnecessary scrollbars
      />
    </View>
  );
}
