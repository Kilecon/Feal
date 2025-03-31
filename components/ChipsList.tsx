import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAppleAlt,
  faCalendarDay,
  faDoorClosed,
  faKitMedical,
  faLeaf,
  faLocationDot,
  faSkull,
  faSpa,
  faStar,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Box, Theme } from 'theme';

import { Chips } from '~/components/Chips';

export enum ChipsTipsKeys {
  tropical,
  indoor,
  medical,
  flowers,
  flowering,
  cuisine,
  poisonous_to_humans,
  poisonous_to_pets,
  edible_fruit,
  edible_leaf,
  rare,
  invasive,
  fruits,
}

type ChipsListProps = {
  chipsToShow: ChipsTipsKeys[];
};

type ChipsData = {
  label: string;
  color: keyof Theme['colors'];
  icon: IconProp;
};

const chipsTips: Record<ChipsTipsKeys, ChipsData> = {
  [ChipsTipsKeys.tropical]: {
    label: 'Tropical',
    color: 'orange',
    icon: faLocationDot,
  },
  [ChipsTipsKeys.indoor]: {
    label: 'Indoor',
    color: 'green',
    icon: faDoorClosed,
  },
  [ChipsTipsKeys.medical]: {
    label: 'Medical',
    color: 'green',
    icon: faKitMedical,
  },
  [ChipsTipsKeys.flowers]: {
    label: 'Flowers',
    color: 'pink',
    icon: faSpa,
  },
  [ChipsTipsKeys.flowering]: {
    label: 'Flowering',
    color: 'pink',
    icon: faCalendarDay,
  },
  [ChipsTipsKeys.cuisine]: {
    label: 'Cuisine',
    color: 'green',
    icon: faUtensils,
  },
  [ChipsTipsKeys.poisonous_to_humans]: {
    label: 'Poisonous to humans',
    color: 'red',
    icon: faSkull,
  },
  [ChipsTipsKeys.poisonous_to_pets]: {
    label: 'Poisonous to pets',
    color: 'red',
    icon: faSkull,
  },
  [ChipsTipsKeys.edible_fruit]: {
    label: 'Edible fruit',
    color: 'green',
    icon: faAppleAlt,
  },
  [ChipsTipsKeys.edible_leaf]: {
    label: 'Edible leaf',
    color: 'green',
    icon: faLeaf,
  },
  [ChipsTipsKeys.rare]: {
    label: 'Rare',
    color: 'green',
    icon: faStar,
  },
  [ChipsTipsKeys.invasive]: {
    label: 'Invasive',
    color: 'green',
    icon: faLeaf,
  },
  [ChipsTipsKeys.fruits]: {
    label: 'Fruits',
    color: 'green',
    icon: faAppleAlt,
  },
};

export const ChipsList = ({ chipsToShow }: ChipsListProps) => {
  return (
    <Box flexDirection="row" flexWrap="wrap" gap="s_8">
      {Object.entries(chipsTips)
        .filter(([key, tip]) => chipsToShow.includes(Number(key)))
        .map(([key, tip]) => (
          <Chips key={key} label={tip.label} color={tip.color} icon={tip.icon} />
        ))}
    </Box>
  );
};
