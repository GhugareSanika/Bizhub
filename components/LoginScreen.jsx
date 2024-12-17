import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "./../hooks/userWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        console.log("OAuth successful, session active!");
      } else {
        console.warn("OAuth completed, but no session was created.");
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  }, [startOAuthFlow]);

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={require("./../assets/images/image.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Your Ultimate{" "}
          <Text style={styles.highlight}>Community Business Directory</Text> App
        </Text>
        <Text style={styles.description}>
          Find your favorite business near you and post your own business to
          your community.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 200,
    height: 400,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#000",
  },
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 30,
    fontFamily: "lato-bold",
    textAlign: "center",
  },
  highlight: {
    color: Colors.BTN,
  },
  description: {
    fontSize: 15,
    fontFamily: "lato-regular",
    textAlign: "center",
    marginVertical: 15,
    color: Colors.GRAY,
  },
  btn: {
    backgroundColor: Colors.BTN,
    padding: 13,
    borderRadius: 20,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "lato-bold",
  },
});
