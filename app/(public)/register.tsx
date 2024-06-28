import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect, useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import {
  Text,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  FormControl,
  VStack,
  Heading,
  InputIcon,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
  GluestackUIProvider,
  Box,
  LinkText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, View } from "react-native";

const Register = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [btnSubmitState, setBtnSubmitState] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log("emailAddress", emailAddress);
  console.log("password", password);

  useEffect(() => {
    if (emailAddress && password) {
      setBtnSubmitState(false);
    } else {
      setBtnSubmitState(true);
    }
  }, [emailAddress, password]);

  const handleState = (): void => {
    setShowPassword(!showPassword);
  };
  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      const createUserResult = await signUp.create({
        emailAddress,
        password,
      });

      console.log("createUserResult", createUserResult);
      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log("completeSignUp", completeSignUp);
      const clerkUserId = completeSignUp?.id!;
      console.log("clerkUserId", clerkUserId);

      const createUserDbResult = await fetch(
        "http://192.168.0.112:3000/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAddress,
            clerkUserId: clerkUserId,
          }),
        }
      );

      console.log("createUserDbResult status code", createUserDbResult.status);
      if (
        createUserDbResult.status == 201 &&
        completeSignUp.status === "complete"
      ) {
        await setActive({ session: completeSignUp.createdSessionId });
      } else {
        console.log("running in process");
      }
    } catch (err: any) {
      console.log(err.errors);
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <Center
        w={"100%"}
        height={"$full"}
        flex={1}
        backgroundColor="#C8E9E7"
        gap={10}
        p={6}
      >
        {/* Hide Header back option is "verification-in-progress" */}
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <Spinner visible={loading} />

        {!pendingVerification && (
          <>
            {/* <Center
            w={"100%"}
            height={"$full"}
            flex={1}
            backgroundColor="blue"
            gap={10}
            p={6}
          > */}
            <FormControl
              p="$6"
              borderWidth="$1"
              borderRadius="$lg"
              borderColor="$borderLight300"
              $dark-borderWidth="$1"
              $dark-borderRadius="$lg"
              $dark-borderColor="$borderDark800"
              backgroundColor="#fff"
              width={"100%"}
            >
              <VStack space="xl" backgroundColor="#fff">
                <Heading color="$rose400" lineHeight="$md">
                  Subber
                </Heading>
                <VStack space="sm">
                  <Text color="$black" lineHeight="$xs">
                    Email
                  </Text>
                  <Input borderColor="$black">
                    <InputField
                      autoCorrect={false}
                      autoCapitalize="none"
                      type="text"
                      value={emailAddress}
                      onChangeText={(value) => {
                        setEmailAddress(value);
                      }}
                    />
                  </Input>
                </VStack>
                <VStack space="xs">
                  <Text color="$text500" lineHeight="$xs">
                    Password
                  </Text>
                  <Input borderColor="$black">
                    <InputField
                      autoCorrect={false}
                      autoCapitalize="none"
                      type={showPassword ? "text" : "password"}
                      onChangeText={(value) => {
                        setPassword(value);
                      }}
                    />
                    <InputSlot pr="$3" onPress={handleState}>
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                        color="$teal600"
                      />
                    </InputSlot>
                  </Input>
                </VStack>
                <Button
                  isDisabled={btnSubmitState}
                  backgroundColor="$rose400"
                  m="auto"
                  w={"50%"}
                  onPress={() => {
                    console.warn("signing up");
                    onSignUpPress();
                  }}
                >
                  <ButtonText color="$white">Register</ButtonText>
                </Button>
              </VStack>
            </FormControl>

            <Box mt={6} gap={10}>
              <Link href="/login">
                <LinkText size="md" color="$black">
                  I already have an user account
                </LinkText>
              </Link>
            </Box>
          </>
        )}

        {pendingVerification && (
          <>
            <VStack space="md">
              <Box justifyContent="flex-start" width={"60%"}>
                <Text>Verification Code:</Text>
                <Input borderColor="$black" w={"$full"}>
                  <InputField
                    autoCorrect={false}
                    autoCapitalize="none"
                    type={"text"}
                    onChangeText={(value) => {
                      setCode(value);
                    }}
                  />
                </Input>
              </Box>
              <Button
                isDisabled={btnSubmitState}
                backgroundColor="$rose400"
                m="auto"
                w={"35%"}
                onPress={() => {
                  console.warn("signing up");
                  onPressVerify();
                }}
              >
                <ButtonText color="$white" m={"auto"} fontSize="$xl">
                  Go
                </ButtonText>
              </Button>
            </VStack>
          </>
        )}
      </Center>
    </GluestackUIProvider>
  );
};

export default Register;
