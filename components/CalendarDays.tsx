import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  interpolateColor,
  FadeInRight,
  withSequence,
  withDelay
} from 'react-native-reanimated';

interface CalendarDay {
  day: string;
  label: string;
  status: string;
}

interface CalendarDaysProps {
  days: CalendarDay[];
  selectedIndex?: number;
  onDayPress?: (index: number) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const DayItem = ({ 
  item, 
  index, 
  isSelected, 
  onPress 
}: { 
  item: CalendarDay; 
  index: number; 
  isSelected: boolean; 
  onPress: () => void 
}) => {
  // Animation values
  const progress = useSharedValue(isSelected ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
    if (isSelected) {
      scale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withSpring(1.05, { damping: 12, stiffness: 200 }),
        withSpring(1)
      );
    }
  }, [isSelected]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#FFFDF6', '#3E2723'] // Cream to Espresso
    );
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#E8E0C5', '#D4BE8B'] // Light Ochre to Gold
    );

    return {
      backgroundColor,
      borderColor,
      transform: [{ scale: scale.value }],
      elevation: isSelected ? 4 : 1,
      shadowOpacity: isSelected ? 0.2 : 0.05,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ['#3E2723', '#FFFDF6'] // Espresso to Cream
    );
    return { color };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ['#8C7A6B', '#D4BE8B'] // Muted Brown to Gold
    );
    return { color };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vacation': return '#ff4444';
      case 'scheduled': return '#10b981'; // Green
      case 'suspended': return '#F59E0B'; // Amber
      default: return 'transparent';
    }
  };

  return (
    <Animated.View entering={FadeInRight.delay(index * 100).springify().damping(14)}>
      <AnimatedTouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.dayContainer, animatedContainerStyle]}
      >
        <Animated.Text style={[styles.dayNumber, animatedTextStyle]}>
          {item.day}
        </Animated.Text>
        <Animated.Text style={[styles.dayLabel, animatedLabelStyle]}>
          {item.label}
        </Animated.Text>
        
        {/* Status indicator with bounce effect */}
        <View style={[styles.statusDotContainer]}>
          {item.status !== 'none' && (
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          )}
        </View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};

const CalendarDays: React.FC<CalendarDaysProps> = ({ 
  days, 
  selectedIndex = 0, 
  onDayPress 
}) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={days}
        renderItem={({ item, index }) => (
          <DayItem 
            item={item} 
            index={index} 
            isSelected={index === selectedIndex}
            onPress={() => onDayPress?.(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        bounces={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16, // Give room for shadows and scale animation
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 20, // Vertical pill shape
    borderWidth: 1,
    width: 40,
    height: 56,
    shadowColor: '#D4BE8B', // Glowing effect color
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  dayLabel: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusDotContainer: {
    position: 'absolute',
    top: -4,
    height: 12,
    width: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // To mask the pill border behind the dot
    borderRadius: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
});

export default CalendarDays;
