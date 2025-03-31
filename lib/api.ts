import axios from 'axios';

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
  last_page: number;
};
const API_URL = `${process.env.EXPO_PUBLIC_API_URL}?key=${process.env.EXPO_PUBLIC_API_KEY}`;

export const fetchPlantList = async (searchValue: string, page = 1): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${API_URL}&q=${searchValue}&page=${page}`);
  return response.data;
};
