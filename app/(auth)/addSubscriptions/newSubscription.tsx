import { View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Text,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  FormControl,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  ChevronDownIcon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectItem,
  VStack,
  Heading,
  InputIcon,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
  GluestackUIProvider,
  Divider,
  Box,
  LinkText,
  FlatList,
  SectionList,
  HStack,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  AddIcon,
  Icon,
  ButtonIcon,
  SelectPortal,
  FormControlLabelText,
  FormControlLabel,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { getSubscriptionNameAndUrl } from "../../../utils/helper";

export default function newSubscription() {
  const { type, id } = useLocalSearchParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("id", id);
    const callAsync = async () => {
      const subscriptionDetails = await getSubscriptionNameAndUrl(id);
      console.log("subscriptionDetails", subscriptionDetails);
      setSubscriptionDetails(subscriptionDetails);
      setLoading(false);
    };

    callAsync();
  }, []);
  return (
    <GluestackUIProvider config={config}>
      <Spinner visible={loading} />
      {/* Adding Existing subscription */}
      {type === "existing" && (
        <Box
          py={"$3"}
          // justifyContent="center"
          bg="#FFC1C1"
          h={"$full"}
          w={"$full"}
        >
          {/* Subscription image + Subscription Name */}
          <HStack alignItems="center" gap={"$3"} bg="$white">
            <Avatar size="md">
              <AvatarImage
                source={{ uri: subscriptionDetails?.image_url }}
                alt="avatar image icon"
                // height={"$50%"}
              />
            </Avatar>
            <Heading color="$black" size={"sm"}>
              {subscriptionDetails?.name!}
            </Heading>
          </HStack>
          {/* Add Input form control */}

          <VStack px={"$2"}>
            {/* Plan Name */}
            <FormControl
              bg="#fff"
              isRequired={true}
              flexDirection="row"
              gap={"$3"}
              alignItems="center"
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Plan Name</FormControlLabelText>
              </FormControlLabel>
              <Input flex={1} bg="#C8E9E7">
                <InputField
                  color="$black"
                  placeholder="Plan Name"
                  placeholderTextColor={"$gray"}
                  p={"$4"}
                />
              </Input>
            </FormControl>
            <Divider my={"$2"} />

            <FormControl
              bg="#fff"
              isRequired={true}
              flexDirection="row"
              gap={"$3"}
              alignItems="center"
              p={"$4"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Plan Price</FormControlLabelText>
              </FormControlLabel>
              <Input flex={1} bg="#C8E9E7">
                <InputField
                  color="$black"
                  placeholder="Plan Price"
                  placeholderTextColor={"$gray"}
                />
              </Input>
            </FormControl>
            <Divider my={"$2"} />
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectInput placeholder="Billing Period" />
                  {/* <SelectIcon mr="$3"> */}
                  {/* <Icon as={ChevronDownIcon} /> */}
                  {/* </SelectIcon> */}
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      {/* <SelectDragIndicator /> */}
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="India" value="India" />
                    <SelectItem label="Sri Lanka" value="Sri Lanka" />
                    <SelectItem label="Uganda" value="Uganda" />
                    {/* <SelectItem label="Japan" value="Japan" /> */}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
            <FormControl>
              <Button bg="$darkBlue600">
                <ButtonText fontSize="$sm" fontWeight="$medium">
                  Next
                </ButtonText>
              </Button>
            </FormControl>
          </VStack>
        </Box>
      )}
      {/* Adding New subscription */}
      {type === "new" && <Text>new</Text>}
    </GluestackUIProvider>
  );
}
