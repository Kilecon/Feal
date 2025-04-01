import axios from 'axios';

import { ApiResponse, Plant } from '~/types/api.type';

const API_URL = `${process.env.EXPO_PUBLIC_API_LIST_URL}?key=${process.env.EXPO_PUBLIC_API_KEY}`;

export const fetchPlantList = async (searchValue: string, page = 1): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${API_URL}&q=${searchValue}&page=${page}`);
  return response.data;
};

export const fetchPlant = async (id: number): Promise<Plant> => {
  const response = await axios.get<Plant>(
    `${process.env.EXPO_PUBLIC_API_URL}/${id}?key=${process.env.EXPO_PUBLIC_API_KEY}`
  );
  return response.data;
};
