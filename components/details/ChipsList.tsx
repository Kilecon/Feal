import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Box, Text, Theme } from 'theme';
import Animated from 'react-native-reanimated';
import { Chips } from '../Chips';

type ChipsListProps = {
  data: Array<{
    id: string;
    label: string;
    color?: keyof Theme['colors'];
    icon?: IconDefinition;
  }>;
  onChipPress?: (id: string) => void;
};

export const ChipsList = ({ data, onChipPress }: ChipsListProps) => {
  return (
    <Animated.FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.chipContainer}>
          {onChipPress ? (
            <TouchableOpacity onPress={() => onChipPress(item.id)}>
              <Chips
                label={item.label}
                color={item.color}
                icon={item.icon}
              />
            </TouchableOpacity>
          ) : (
            <Chips
              label={item.label}
              color={item.color}
              icon={item.icon}
            />
          )}
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    marginRight: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});