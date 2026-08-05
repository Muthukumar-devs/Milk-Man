import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CategoriesFilterProps {
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const categories = [
  { id: '1', name: 'Milk', icon: 'bottle-soda-outline', key: 'milk' },
  { id: '2', name: 'Dairy', icon: 'cheese', key: 'dairy' },
  { id: '3', name: 'Curd & Yogurt', icon: 'bowl-mix-outline', key: 'curd' },
  { id: '4', name: 'Ghee', icon: 'pot-steam-outline', key: 'ghee' },
];

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ selectedCategory, onCategorySelect }) => {
  const router = useRouter();

  return (
    <View className="mt-2 mb-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {categories.map(category => {
          const isSelected = selectedCategory === category.key;
          return (
            <TouchableOpacity
              key={category.id}
              className="items-center mr-5"
              onPress={() => {
                onCategorySelect?.(category.key);
                if (!onCategorySelect) {
                  router.push({ pathname: '/(tabs)/products', params: { category: category.key } });
                }
              }}
            >
              <View
                className={`w-20 h-20 rounded-2xl justify-center items-center mb-2 ${isSelected ? 'bg-ochre-200' : 'bg-cream-100'}`}
              >
                <MaterialCommunityIcons
                  name={category.icon as any}
                  size={34}
                  color={isSelected ? '#FFFDF6' : '#3E2723'}
                />
              </View>
              <Text className="text-xs text-espresso-100 text-center font-medium">{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesFilter;
