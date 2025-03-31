export type Plant = {
  id: number;
  common_name: string | null;
  scientific_name: string[];
  family: string | null;
  default_image?: {
    medium_url: string;
  };
};

export type ApiResponse = {
  data: Plant[];
  total: number;
};
