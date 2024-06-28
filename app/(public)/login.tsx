import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
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

const Login = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [btnSubmitState, setBtnSubmitState] = useState(true);
  const [emailAddress, setEmailAddress] = useState<string | undefined>(
    undefined
  );
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress!,
        password,
      });
      console.log("completeSignIn", signInAttempt);
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
        });
        console.log("signInAttempt.createdSessionId successful");
        console.log("redirected to homepage");
      }
      // This indicates the user is signed in
    } catch (err: any) {
      console.log("err", err.errors);
      // if (err.errors[0].code == "session_exists")
      //   router.replace("(protected)/analytics");
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <Spinner visible={loading} />
      <Center
        w={"100%"}
        height={"$full"}
        flex={1}
        backgroundColor="#C8E9E7"
        gap={10}
        p={6}
      >
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
                onSignInPress();
              }}
            >
              <ButtonText color="$white">Login</ButtonText>
            </Button>
          </VStack>
        </FormControl>

        <Box mt={6} gap={10}>
          <Link href="/reset">
            <LinkText size="md" color="$black">
              Reset password
            </LinkText>
          </Link>

          <Link href="/register">
            <LinkText size="md" color="$black">
              Register an account
            </LinkText>
          </Link>
        </Box>
      </Center>
    </GluestackUIProvider>
  );
};

export default Login;
