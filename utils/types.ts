export type SubscriptionType = {
  name: string;
  image_url: string;
};

export type Category = {
  category: string;
  category_url: string;
  subscriptions: SubscriptionType[];
};

export type availableSubscriptionsOutput = {
  categories: Category[];
};
