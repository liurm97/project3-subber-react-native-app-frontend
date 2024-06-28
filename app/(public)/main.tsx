// Home Screen - Sign in & Sign up

import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  // Text,
  View,
} from "react-native";
import {
  GluestackUIProvider,
  Center,
  Text,
  Button,
  ButtonText,
  Box,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Main = () => {
  const homeBgImage = {
    uri: "https://firebasestorage.googleapis.com/v0/b/subber-71436.appspot.com/o/output-onlinepngtools.png?alt=media&token=d9084ea9-8ac2-4827-a959-f21f6fd7db3b",
  };
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Box style={styles.container}>
          <Box style={styles.topContainer}>
            <ImageBackground
              source={homeBgImage}
              resizeMode="contain"
              style={styles.homeBgImage}
            >
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Subber</Text>
                <Text style={styles.subText}>
                  Track your subscriptions - all in one convenient place!
                </Text>
              </View>
            </ImageBackground>
          </Box>

          <Center bg="$white" h={"20%"} w={"100%"} gap={"$2"} p={"$4"}>
            <Link href={"/register"} asChild>
              <Button
                width={"100%"}
                borderRadius={"$xl"}
                size="lg"
                variant="solid"
                backgroundColor="$rose400"
                // action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => console.log("Button Pressed")}
              >
                <ButtonText color="$white">Get Started </ButtonText>
              </Button>
            </Link>
            <Link href={"/login"} asChild>
              <Button
                width={"100%"}
                borderRadius={"$xl"}
                size="lg"
                variant="outline"
                borderColor="$teal500"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => console.log("Button Pressed")}
              >
                <ButtonText color="$rose400">Log in </ButtonText>
              </Button>
            </Link>
          </Center>
        </Box>
      </GluestackUIProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#C8E9E7",
    alignContent: "center",
    justifyContent: "center",
  },
  homeBgImage: {
    flex: 1,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    opacity: 1,
  },
  mainText: {
    marginTop: 10,
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  subText: {
    color: "#000",
    fontSize: 14,
    fontWeight: 200,
  },

  bottomContainer: {
    flex: 1,
    padding: 10,
  },
});
export default Main;
