import { View } from "react-native";
import React, { Component, useEffect, useState, useRef } from "react";
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
  Textarea,
  TextareaInput,
  FormControlHelper,
  FormControlHelperText,
  SelectDragIndicator,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  getSubscriptionNameAndUrl,
  subscribeToExistingSubscription,
} from "../../../utils/helper";
import { Modal } from "../../components/Modal";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
export default function newSubscription() {
  const router = useRouter();
  const { type, id } = useLocalSearchParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isInvalid, setIsInvalid] = useState({
    planName: true,
    planPrice: true,
    billingPeriod: true,
    paymentStartDate: true,
    paymentEndDate: true,
  });

  const [formValue, setFormValue] = useState({
    subscriptionId: id,
    planName: "",
    planPrice: -1.0,
    billingPeriod: "",
    paymentStartDate: dayjs.utc().format("YYYY-MM-DD"),
    paymentEndDate: dayjs.utc().format("YYYY-MM-DD"),
  });

  const updateFirstPaymentDate = (newDate: any) => {
    setFormValue({ ...formValue, paymentStartDate: newDate });
  };

  const updateLastPaymentDate = (newDate: any) => {
    setFormValue({ ...formValue, paymentEndDate: newDate });
  };

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

  // useEffect(() => {
  // if (
  //   dayjs(formValue.dateOfFirstPayment).isAfter(
  //     dayjs(formValue.dateOfLastPayment),
  //     "date"
  //   )
  // ) {
  //   setIsInvalid({ ...isInvalid, dateOfFirstPayment: true });
  // }
  //   if (formValue.planName != "") {
  //     setIsInvalid({ ...isInvalid, planName: false });
  //   } else {
  //     setIsInvalid({ ...isInvalid, planName: true });
  //   }

  //   if (formValue.planPrice > 0) {
  //     setIsInvalid({ ...isInvalid, planPrice: false });
  //   } else {
  //     setIsInvalid({ ...isInvalid, planPrice: true });
  //   }

  //   if (formValue.billingPeriod !== "") {
  //     setIsInvalid({ ...isInvalid, billingPeriod: false });
  //   } else {
  //     setIsInvalid({ ...isInvalid, billingPeriod: true });
  //   }
  // }, [formValue]);

  console.log("isInvalid", isInvalid);

  console.log("formValue", formValue);
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
          <HStack
            alignItems="center"
            gap={"$3"}
            justifyContent="center"
            mb={"$2"}
          >
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

          <VStack px={"$2"} gap={"$0.5"}>
            {/* Plan Name */}
            <FormControl
              isInvalid={isInvalid.planName}
              bg="#fff"
              isRequired={true}
              flexDirection="row"
              gap={"$3"}
              alignItems="center"
              p={"$4"}
              borderRadius={"$lg"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Plan Name</FormControlLabelText>
              </FormControlLabel>
              <Input flex={1} bg="#C8E9E7">
                <InputField
                  color="$black"
                  placeholder="Panda Pro"
                  placeholderTextColor={"$gray"}
                  onChangeText={(value) => {
                    setFormValue({ ...formValue, planName: value });
                  }}
                />
              </Input>
            </FormControl>
            <FormControl
              isInvalid={isInvalid.planPrice}
              bg="#fff"
              isRequired={true}
              flexDirection="row"
              gap={"$3"}
              alignItems="center"
              p={"$4"}
              borderRadius={"$lg"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Plan Price</FormControlLabelText>
              </FormControlLabel>
              <Input flex={1} bg="#C8E9E7">
                <InputField
                  color="$black"
                  placeholder="9.99"
                  placeholderTextColor={"$gray"}
                  onChangeText={(value) =>
                    setFormValue({ ...formValue, planPrice: Number(value) })
                  }
                />
              </Input>
            </FormControl>
            <Divider my={"$2"} bgColor="$white" />

            <VStack gap={"$0.5"}>
              {/* Billing Period */}
              <FormControl
                bg="$white"
                isRequired={true}
                p={"$4"}
                borderRadius={"$lg"}
                isInvalid={isInvalid.billingPeriod}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Billing Period</FormControlLabelText>
                </FormControlLabel>
                <Select
                  bg="#C8E9E7"
                  onValueChange={(value) =>
                    setFormValue({ ...formValue, billingPeriod: value })
                  }
                >
                  <SelectTrigger>
                    <SelectInput
                      placeholder="Frequency"
                      color="$black"
                      bg="#C8E9E7"
                    />
                    <SelectIcon mr={"$3"}>
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="every day" value="every day" />
                      <SelectItem label="every month" value="every month" />
                      <SelectItem label="every year" value="every year" />
                      {/* <SelectItem label="Japan" value="Japan" /> */}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
              {/* Date of first payment */}
              <FormControl
                isInvalid={isInvalid.paymentStartDate}
                isRequired={true}
                bg="$white"
                p={"$2"}
                borderRadius={"$lg"}
              >
                <VStack>
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>
                        Date of first payment
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Modal
                      update={0}
                      updateFirstPaymentDate={updateFirstPaymentDate}
                    />
                  </Box>
                </VStack>
                {/* <FormControlError> */}
                {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                {/* <FormControlErrorText>
                    First payment no earlier than last payment
                  </FormControlErrorText> */}
                {/* </FormControlError> */}
              </FormControl>
              {/* Date of end payment */}
              <FormControl
                isRequired={true}
                isInvalid={isInvalid.paymentEndDate}
                bg="$white"
                p={"$2"}
                borderRadius={"$lg"}
              >
                <VStack>
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>
                        Date of last payment
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Modal
                      update={1}
                      updateLastPaymentDate={updateLastPaymentDate}
                    />
                  </Box>
                </VStack>
              </FormControl>
            </VStack>
            {/* Notes */}
            <FormControl py={"$2"}>
              <FormControlLabel>
                <FormControlLabelText>Notes</FormControlLabelText>
              </FormControlLabel>
              <Textarea borderColor="$teal500" w="$full" h={"$16"}>
                <TextareaInput size="sm" />
              </Textarea>
            </FormControl>
            <Button
              size="lg"
              variant="solid"
              backgroundColor="$red500"
              borderRadius={"$lg"}
              action="secondary"
              onPress={async () => {
                await subscribeToExistingSubscription(formValue);
                router.push("/mySubscriptions");
              }}
            >
              <ButtonText fontSize="$sm" fontWeight="$bold" size="3xl">
                CREATE
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      )}
      {/* Adding New subscription */}
      {type === "new" && <Text>new</Text>}
    </GluestackUIProvider>
  );
}
