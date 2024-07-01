import AsyncStorage from "@react-native-async-storage/async-storage";
const dayjs = require("dayjs");

export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    console.log(`Setting ${key} with a value of ${value} in AsyncStorage`);
    await AsyncStorage.setItem(key, value);
    console.log("AsyncStorage.setItem is successful");
  } catch (e) {
    console.log("error occured during AsyncStorage.setItem");
  }
};

export const getData = async (key: string): Promise<string | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("value of getData", value);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("error occured during AsyncStorage.getItem");
  }
};

export const getPaymentNextDates = async (date: string): Promise<string[]> => {
  console.log("INSIDE getPaymentNextDates");
  const signedInUserId = await getData("signInUserId");
  const response = await fetch(
    `http://192.168.0.112:3000/subscriptions/subscribed/users/${signedInUserId}/?year=${dayjs(
      date
    ).format("YYYY")}&month=${dayjs(date).format("MM")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  const paymentNextDates = result?.subscriptions?.map(
    (subscription: any) => subscription.payment_next_date
  );
  console.log("getPaymentNextDates", paymentNextDates);
  return paymentNextDates;
};

export const getEarliestDate = async (date: string): Promise<any> => {
  const signedInUserId = await getData("signInUserId");
  console.log("getEarliestDate - signedInUserId", signedInUserId);
  const response = await fetch(
    `http://192.168.0.112:3000/subscriptions/subscribed/users/${signedInUserId}/?year=${dayjs(
      date
    ).format("YYYY")}&month=${dayjs(date).format("MM")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  if (result?.subscription?.length > 0) {
    const paymentStartDates = result.subscriptions?.map((subscription: any) =>
      dayjs.utc(subscription.payment_start_date)
    );
    console.log("paymentStartDates", paymentStartDates);
    const earliestDate = dayjs(Math.min(...paymentStartDates)).format(
      "YYYY-MM-DD"
    );
    console.log("earliestDate", earliestDate);
    return earliestDate;
  }
};

export const getUserMonthlyExpense = async (date: string) => {
  const signedInUserId = await getData("signInUserId");
  const response = await fetch(
    `http://192.168.0.112:3000/expenses/users/${signedInUserId}?year=${dayjs(
      date
    ).format("YYYY")}&month=${dayjs(date).format("MM")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  const expense = result?.result;
  return expense;
};

export type BarChartInitialValueTypes = {
  frontColor: string;
  value: number;
  label: string;
  labelTextStyle: { [color: string]: string };
};

export const makeBarChartInitialValues = async (date: string) => {
  const categories = [
    "music_streaming",
    "video_streaming",
    "food_delivery",
    "insurance",
    "cloud_storage",
    "others",
  ];
  const signedInUserId = await getData("signInUserId");
  const initialValues: BarChartInitialValueTypes[] = [];
  categories.forEach(async (category) => {
    console.log(category);
    const response = await fetch(
      `http://192.168.0.112:3000/expenses/users/${signedInUserId}?year=${dayjs(
        date
      ).format("YYYY")}&month=${dayjs(date).format("MM")}&category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const expense = result?.result;
    initialValues.push({
      frontColor: "#FFC1C1",
      value: expense,
      label:
        category.replace("_", " ").charAt(0).toUpperCase() +
        category.replace("_", " ").slice(1),
      labelTextStyle: { color: "black" },
    });
  });
  console.log("initialValues", initialValues);
  initialValues.sort((a, b) => b.value - a.value);
  return initialValues;
};

export const listAllAvailableSubscriptions = async (view: string) => {
  const signedInUserId = await getData("signInUserId");

  const response = await fetch(
    `http://192.168.0.112:3000/subscriptions/available/users/${signedInUserId}?view=${view}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  console.log("listAllAvailableSubscriptions Result", result);
  return result?.result.categories;
};

export const getSubscriptionNameAndUrl = async (subscriptionId: string) => {
  const response = await fetch(
    `http://192.168.0.112:3000/subscriptions/available/${subscriptionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();
  return result?.result;
};

export const subscribeToExistingSubscription = async (data: any) => {
  const signedInUserId = await getData("signInUserId");
  const response = await fetch(
    `http://192.168.0.112:3000/subscriptions/subscribed/existing/users/${signedInUserId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const listUserSubscribedSubscriptions = async () => {
  const signedInUserId = await getData("signInUserId");

  const response = await fetch(
    `http://192.168.0.112:3000/subscriptions/subscribed/users/${signedInUserId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  console.log("listUserSubscribedSubscriptions Result", result);
  return result?.subscriptions;
};
