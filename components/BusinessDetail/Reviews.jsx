import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();
  // const onSubmit = async () => {
  //   const docRef = doc(db, "BusinessList", business?.id);
  //   await updateDoc(docRef, {
  //     reviews: arrayUnion({
  //       rating: rating,
  //       comment: userInput,
  //       userName: user?.fullName,
  //       userImage: user?.imageUrl,
  //     }),
  //   });
  //   ToastAndroid.show("Comment Added Successfully !!", ToastAndroid.BOTTOM);
  // };

  const onSubmit = async () => {
    if (!business?.id) {
      console.error("Business ID is missing");
      ToastAndroid.show(
        "Unable to add review. Business ID missing!",
        ToastAndroid.BOTTOM
      );
      return;
    }

    try {
      const docRef = doc(db, "BusinessList", business.id);
      console.log("Updating document:", docRef);

      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating,
          comment: userInput,
          userName: user?.fullName || "Anonymous",
          userImage: user?.imageUrl || "",
          useEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      ToastAndroid.show("Comment Added Successfully !!", ToastAndroid.BOTTOM);
      setUserInput(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error adding review:", error.message);
      ToastAndroid.show(
        "Failed to add comment. Try again.",
        ToastAndroid.BOTTOM
      );
    }
  };

  useEffect(() => {
    console.log("Business Data in Reviews:", business);
  }, [business]);

  if (!business) {
    return (
      <View>
        <Text>No business data available</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontFamily: "lato-bold",
          fontSize: 20,
        }}
      >
        Reviews
      </Text>
      <View>
        <Rating
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{
            paddingVertical: 10,
          }}
        />
        <TextInput
          placeholder="Write your comment"
          onChangeText={(value) => setUserInput(value)}
          numberOfLines={4}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          // onPress={() => onSubmit()}
          onPress={() => {
            console.log("Submit button clicked");
            onSubmit();
          }}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "lato-bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* Displays Previous Reviews  */}

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "lato-bold",
                }}
              >
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{
                  alignItems: "flex-start",
                }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// import { View, Text, FlatList } from "react-native";
// import React from "react";
// import { Rating } from "react-native-ratings";

// export default function Reviews({ business }) {
//   const reviews = business?.reviews || []; // Get reviews from business or fallback to an empty array

//   const renderReview = ({ item }) => (
//     <View style={{ marginBottom: 20 }}>
//       <Text style={{ fontFamily: "lato-bold", fontSize: 16 }}>{item.user}</Text>
//       <Text>{item.comment}</Text>
//       <Rating
//         startingValue={item.rating}
//         readonly
//         imageSize={20}
//         style={{ paddingVertical: 5 }}
//       />
//     </View>
//   );

//   if (reviews.length === 0) {
//     return (
//       <Text style={{ textAlign: "center", padding: 20 }}>
//         No reviews available.
//       </Text>
//     );
//   }

//   return (
//     <FlatList
//       data={reviews}
//       renderItem={renderReview}
//       keyExtractor={(item, index) => index.toString()}
//       contentContainerStyle={{ padding: 20 }}
//     />
//   );
// }
