import { Link } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

// TAKE NOTE
/*
1. Payment start date should be present or greater (no historical date)
*/

const index = () => {
  // const [subscription, setSubscriptions] = useState([]);
  return <Link href="addSubscriptions/newSubscription">New subscription</Link>;
};
export default index;

// https://firebasestorage.googleapis.com/v0/b/subber-71436.appspot.com/o/subscriptions%2Faia.png?alt=media&token=be388b40-bdbe-4f8c-b68e-8d197540d495
// https://firebasestorage.googleapis.com/v0/b/subber-71436.appspot.com/o/subscriptions%2Fchatgpt.png?alt=media&token=94bfcd4a-2c6c-45c6-ac35-1a213b7f9e1b
