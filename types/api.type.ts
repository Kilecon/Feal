export type Plant = {
  id: number;
  common_name: string | null;
  description: string | null;
  flowers: boolean;
  fruits: boolean;
  medicinal: boolean;
  edible_fruit: boolean;
  edible_leaf: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  cuisine: boolean;
  indoor: boolean;
  tropical: boolean;
  rare: boolean;
  invasive: boolean;
};

export type ApiResponse = {
  data: Plant[];
  total: number;
  last_page: number;
};
