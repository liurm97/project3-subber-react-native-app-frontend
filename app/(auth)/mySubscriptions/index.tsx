import { Link, useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
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
  FlatList,
  SectionList,
  HStack,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  AddIcon,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  listAllAvailableSubscriptions,
  listUserSubscribedSubscriptions,
} from "../../../utils/helper";
import {
  availableSubscriptionsOutput,
  SubscriptionType,
  Category,
} from "../../../utils/types";
// TAKE NOTE
/*
1. Payment start date should be present or greater (no historical date)
*/

// export type SubscriptionType = {
//   name: string;
//   image_url: string;
//   category: string;
//   category_url: string;
// };

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<string>("list");
  const [subscriptions, setSubscriptions] = useState<
    availableSubscriptionsOutput[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const callAsync = async () => {
        setSubscriptions(await listUserSubscribedSubscriptions());
        setLoading(false);
      };

      callAsync();
    }, [])
  );

  console.log("subscriptions", subscriptions);
  // const [subscription, setSubscriptions] = useState([]);
  return (
    <GluestackUIProvider config={config}>
      <Spinner visible={loading} />
      <Box>
        <FlatList
          data={subscriptions}
          bg="#FFC1C1"
          minWidth={300}
          height={"90%"}
          // pb="$8"
          // py={"$4"}
          keyExtractor={(item: any, index) => item + index}
          // stickySectionHeadersEnabled={true}
          renderItem={({ item, index }) => (
            <Box bg="$white" bgColor="#C8E9E7" w={"$full"} mb={"$2"}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                bg="$white"
                p={"$4"}
              >
                <HStack alignItems="center" gap={"$3"}>
                  <Avatar size="md">
                    <AvatarFallbackText>
                      {item.subscription.image}
                    </AvatarFallbackText>
                    <AvatarImage
                      source={{ uri: item.subscription.image_url }}
                      alt="avatar image icon"
                      // height={"$50%"}
                    />
                  </Avatar>
                  <Heading color="$black" size={"sm"}>
                    {item.subscription.name}
                  </Heading>
                </HStack>
                {/* Box */}
                <VStack
                  alignItems="center"
                  justifyContent="center"
                  bg="#C8E9E7"
                  p={"$2"}
                  borderRadius={"$lg"}
                >
                  <Heading> {"$" + item.subcription_plan.price!} </Heading>
                  <Text>
                    {item.subcription_plan.billing_period_value +
                      " " +
                      item.subcription_plan.billing_period_frequency}
                  </Text>
                </VStack>
              </Box>
            </Box>
          )}
        />
      </Box>
      {/* <Link href="addSubscriptions/newSubscription">New subscription</Link> */}
    </GluestackUIProvider>
  );
};
export default index;
