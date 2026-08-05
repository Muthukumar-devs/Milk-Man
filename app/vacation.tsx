import React from 'react';
import {
  View,
  Text,
  TouchableOpacity, 
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useVacation } from '../context/VacationContext';

const Vacation = () => {
  const { hasVacation, vacationPeriod, deleteVacation } = useVacation();

  const handleDeleteVacation = () => {
    Alert.alert(
      'Delete Vacation',
      'Are you sure you want to delete this vacation period?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: deleteVacation
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="bg-cream px-4 py-4 border-b border-cream-200">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4 p-1"
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-espresso">
            {hasVacation ? 'Vacation' : 'Add Vacation'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {hasVacation ? (
          /* Vacation exists - show vacation card */
          <View className="px-4 pt-6">
            <View className="bg-cream border border-cream-200 rounded-xl p-4 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-espresso-100 text-base">
                  {vacationPeriod}
                </Text>
                <TouchableOpacity 
                  className="bg-red-500 px-4 py-2 rounded-full"
                  onPress={handleDeleteVacation}
                >
                  <Text className="text-cream text-sm font-semibold">
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          /* No vacation - show empty state */
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-2xl font-bold text-espresso mb-16">
              No Vacation
            </Text>
            
            <Image 
              source={require('../assets/images/vacation.png')}
              className="w-72 h-72 mb-12"
              resizeMode="contain"
            />
            
            <TouchableOpacity 
              className="bg-ochre-200 py-4 px-12 rounded-full mb-8"
              onPress={() => router.push('/add-vacation')}
            >
              <Text className="text-cream text-lg font-semibold">
                ADD VACATION
              </Text>
            </TouchableOpacity>
            
            <Text className="text-espresso-100 text-center text-base leading-6">
              No delivery would be made in your{'\n'}vacation period
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Vacation;
