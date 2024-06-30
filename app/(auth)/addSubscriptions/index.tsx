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
import { listAllAvailableSubscriptions } from "../../../utils/helper";
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
        setSubscriptions(await listAllAvailableSubscriptions(view));
        setLoading(false);
      };

      callAsync();
    }, [view])
  );

  console.log("subscriptions", subscriptions);
  // const [subscription, setSubscriptions] = useState([]);
  return (
    <GluestackUIProvider config={config}>
      <Spinner visible={loading} />
      <Box>
        <SectionList
          bg="#FFC1C1"
          minWidth={300}
          height={"90%"}
          // pb="$8"
          // py={"$4"}
          sections={subscriptions!}
          keyExtractor={(item, index) => item + index}
          // stickySectionHeadersEnabled={true}
          renderItem={({ item, index }) => (
            <Box bg="$white" bgColor="#C8E9E7" w={"$full"} mb={"$2"}>
              <Box
                p={"$2"}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack alignItems="center" gap={"$3"}>
                  <Avatar size="md">
                    <AvatarFallbackText>{item.image}</AvatarFallbackText>
                    <AvatarImage
                      source={{ uri: item.image_url }}
                      alt="avatar image icon"
                      // height={"$50%"}
                    />
                  </Avatar>
                  <Heading color="$black" size={"sm"}>
                    {item.name}
                  </Heading>
                </HStack>
                {/* Button */}
                <Button
                  size="md"
                  variant="solid"
                  backgroundColor="$red"
                  borderRadius={"$lg"}
                  action="secondary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    console.log(`${item.name}(${item.id}) is pressed`);
                    router.push(
                      `addSubscriptions/newSubscription?id=${item.id}&type=existing`
                    );
                  }}
                >
                  <ButtonIcon as={AddIcon} size="xl" />
                </Button>
              </Box>
            </Box>
          )}
          renderSectionHeader={({ section: { category } }) => (
            <Box p={"$4"}>
              <Heading fontSize="$xl" mt="$8" pb="$4">
                {category}
              </Heading>
            </Box>
          )}
        />
        {/* Create new subscription button */}
        <Button
          size="lg"
          variant="solid"
          backgroundColor="$red500"
          borderRadius={"$lg"}
          action="secondary"
          isDisabled={false}
          isFocusVisible={false}
          // p={"$4"}
          onPress={() => {
            console.log(`Create your own is pressed`);
            router.push("addSubscriptions/newSubscription?type=new");
          }}
        >
          <Box justifyContent="center">
            <ButtonText size="2xs" textAlign="center" color="#fdfdfd">
              (Can't find the subscription you want?)
            </ButtonText>
            <ButtonText size="xl" fontWeight={"$bold"} textAlign="center">
              Create Your Own
            </ButtonText>
          </Box>
        </Button>
      </Box>
      {/* <Link href="addSubscriptions/newSubscription">New subscription</Link> */}
    </GluestackUIProvider>
  );
};
export default index;
