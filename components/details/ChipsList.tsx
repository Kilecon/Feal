import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, LayoutChangeEvent, ScrollView } from 'react-native';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Box, Text, Theme } from 'theme';
import { Chips } from '../Chips';

type ChipsListProps = {
  data: Array<{
    id: string;
    label: string;
    color?: keyof Theme['colors'];
    icon?: IconDefinition;
  }>;
  onChipPress?: (id: string) => void;
  onMorePress?: () => void;
};

export const ChipsList = ({ data, onChipPress, onMorePress }: ChipsListProps) => {
  const [visibleChips, setVisibleChips] = useState<typeof data>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const chipRefs = useRef<Array<{ width: number; id: string }>>([]);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const measureChip = (id: string, width: number) => {
    const existingIndex = chipRefs.current.findIndex(chip => chip.id === id);
    
    if (existingIndex >= 0) {
      chipRefs.current[existingIndex].width = width;
    } else {
      chipRefs.current.push({ id, width });
    }
    
    if (chipRefs.current.length === data.length) {
      calculateVisibleChips();
    }
  };

  const calculateVisibleChips = () => {
    if (containerWidth === 0) return;
    
    let totalWidth = 0;
    const moreButtonWidth = 50;
    const visible: typeof data = [];
    
    for (const item of data) {
      const chipInfo = chipRefs.current.find(chip => chip.id === item.id);
      if (!chipInfo) continue;
      
      const chipTotalWidth = chipInfo.width + styles.chipContainer.marginRight;
      
      if (totalWidth + chipTotalWidth + moreButtonWidth > containerWidth && visible.length > 0) {
        setShowMoreButton(true);
        break;
      }
      
      totalWidth += chipTotalWidth;
      visible.push(item);
    }
    
    if (visible.length === data.length) {
      setShowMoreButton(false);
    }
    
    setVisibleChips(visible);
  };

  useEffect(() => {
    if (containerWidth > 0 && chipRefs.current.length === data.length) {
      calculateVisibleChips();
    }
  }, [data, containerWidth]);

  const handleMorePress = () => {
    if (onMorePress) {
      onMorePress();
    }
  };

  return (
    <View style={styles.container} onLayout={handleContainerLayout}>
      <ScrollView
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {visibleChips.map((item) => (
          <View 
            key={item.id}
            style={styles.chipContainer}
            onLayout={(event) => measureChip(item.id, event.nativeEvent.layout.width)}
          >
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
        ))}
        
        {showMoreButton && (
          <TouchableOpacity 
            style={styles.moreButton} 
            onPress={handleMorePress}
          >
            <FontAwesomeIcon icon={faPlus as any} size={16} />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  chipContainer: {
    marginRight: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});