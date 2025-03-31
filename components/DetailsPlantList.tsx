import { DetailsCard } from '~/components/DetailsCard';
import { ScrollView } from 'react-native';
import React from 'react';

export const DetailsPlantList = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 15,
        paddingTop: 36,
      }}>
      <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
      <DetailsCard plant={{ name: 'test', id: 'idplant' }} />
    </ScrollView>
  );
};
