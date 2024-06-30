import { View, Pressable } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BarChartInitialValueTypes, getData } from "../../../utils/helper";
import { useFocusEffect } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import "react-native-svg";
import { BarChart } from "react-native-gifted-charts";

import {
  getPaymentNextDates,
  getEarliestDate,
  getUserMonthlyExpense,
  makeBarChartInitialValues,
} from "../../../utils/helper";
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
import ExpenseCalendar from "../../components/ExpenseCalendar";
// import { BarChart } from "../../components/BarChart";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const index = () => {
  const [userMonthlyExpense, setUserMonthlyExpense] = useState(undefined);
  const { signOut } = useAuth();
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [earliestDate, setEarliestDate] = useState<undefined | string>(
    undefined
  );
  const [paymentNextDates, setpaymentNextDates] = useState<
    undefined | string[]
  >(undefined);

  // useEffect(() => {
  //   console.log("date has changed", date);
  // }, [date]);

  const categories = [
    "music_streaming",
    "video_streaming",
    "food_delivery",
    "insurance",
    "cloud_storage",
    "others",
  ];

  const [barChartInitialValues, setBarChartInitialValues] = useState<
    BarChartInitialValueTypes[] | undefined
  >([]);
  // {
  //   frontColor: "#FFC1C1",
  //   value: 120,
  //   labelTextStyle: { color: "black" },
  // },
  const updateDate = (newDate: string) => {
    setDate(newDate);
    console.log("updateDate", newDate);
  };

  useEffect(() => {
    // useCallback(() =>)
    const callAsync = async () => {
      const paymentNextDates = getPaymentNextDates(date);
      const monthlyExpense = getUserMonthlyExpense(date);
      const barValues = makeBarChartInitialValues(date);
      await Promise.all([
        makeBarChartInitialValues(date),
        getPaymentNextDates(date),
        getUserMonthlyExpense(date),
      ])
        .then((values) => {
          setBarChartInitialValues(values[0]);
          setpaymentNextDates(values[1]);
          setUserMonthlyExpense(values[2]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    callAsync();
  }, [date]);

  useFocusEffect(
    // useFocusEffect - The useFocusEffect hook will invoke the function whenever the route is "focused".
    useCallback(() => {
      const callAsync = async () => {
        const paymentNextDates = await getPaymentNextDates(date);
        const earliestDate = await getEarliestDate(date);
        const monthlyExpense = await getUserMonthlyExpense(date);
        setpaymentNextDates(paymentNextDates);
        setEarliestDate(earliestDate);
        setUserMonthlyExpense(monthlyExpense);
      };

      callAsync();
    }, [])
  );

  const doLogout = () => {
    signOut();
  };

  const signedInUser = useUser();
  console.log("currentDate", date);
  console.log("signedInUser", signedInUser);
  console.log("userMonthlyExpense", userMonthlyExpense);
  console.log("barChartInitialValues", barChartInitialValues);
  return (
    <GluestackUIProvider config={config}>
      {/* Overall container */}
      <Box backgroundColor="#FFC1C1" h={"$full"}>
        {/* Planned Expenses */}
        <Box
          backgroundColor="#C8E9E7"
          pt={"$7"}
          pl={"$2"}
          pr={"$2"}
          flexDirection="row"
          justifyContent="space-between"
          h={"10%"}
        >
          <Text color="$black">Planned Expenses for the month</Text>
          <Text color="$black">SGD {userMonthlyExpense}</Text>
        </Box>

        {/* Calendar + Slider */}
        <Box mt={"$4"} bgColor="#C8E9E7" h={"50%"}>
          {/* <Heading>June 2024</Heading> */}
          <ExpenseCalendar
            initialCalendarDate={date}
            earliestCalendarDate={earliestDate!}
            selectedMonthlyDays={paymentNextDates!}
            updateDate={updateDate}
          ></ExpenseCalendar>
        </Box>
        <Box
          w={"$full"}
          backgroundColor="#C8E9E7"
          pt={"$5"}
          pb={"$10"}
          pl={"$4"}
          pr={"$4"}
          h={"40%"}
          mt={"$4"}
        >
          <BarChart
            initialSpacing={0}
            onPress={(item: any, index: any) => {
              console.log(item);
            }}
            barInnerComponent={(item, index) => {
              return (
                <Box>
                  <Text
                    textAlign="center"
                    color="$black"
                    size="sm"
                    mb={"$1"}
                    fontWeight="bold"
                  >
                    {`${item?.label}`}
                  </Text>
                  <Text textAlign="center" color="$black" size="xs">
                    {`$${item?.value}`}
                  </Text>
                </Box>
              );
            }}
            disableScroll={false}
            barWidth={100}
            scrollToEnd={false}
            onEndReached={() => {
              console.log("end");
            }}
            isAnimated={true}
            data={barChartInitialValues}
          />
        </Box>
      </Box>
    </GluestackUIProvider>
  );
};

export default index;
