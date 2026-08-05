import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useVacation } from '../context/VacationContext';

const AddVacation = () => {
  const { setVacation } = useVacation();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  const onFromDateChange = (event: any, selectedDate?: Date) => {
    setShowFromPicker(false);
    if (selectedDate) {
      setFromDate(formatDate(selectedDate));
    }
  };

  const onToDateChange = (event: any, selectedDate?: Date) => {
    setShowToPicker(false);
    if (selectedDate) {
      setToDate(formatDate(selectedDate));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            Add Vacation
          </Text>
        </View>
      </View>

      {/* Form */}
      <View className="flex-1 px-4 pt-6">
        {/* From Date */}
        <View className="mb-4">
          <View className="flex-row items-center bg-cream-100 border border-cream-200 rounded-xl px-4">
            <TextInput
              placeholder="From Date"
              placeholderTextColor="#D4BE8B"
              className="flex-1 text-base py-4 text-espresso"
              value={fromDate}
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowFromPicker(true)}>
              <Ionicons name="calendar-outline" size={24} color="#D4BE8B" />
            </TouchableOpacity>
          </View>
        </View>

         {showFromPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onFromDateChange}
          />
        )}

        {/* To Date */}
        <View className="mb-8 mt-4">
          <View className="flex-row items-center bg-cream-100 border border-cream-200 rounded-xl px-4">
            <TextInput
              placeholder="To Date (Optional)"
              placeholderTextColor="#D4BE8B"
              className="flex-1 text-base py-4 text-espresso"
              value={toDate}
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowToPicker(true)}>
              <Ionicons name="calendar-outline" size={24} color="#D4BE8B" />
            </TouchableOpacity>
          </View>
        </View>

       

        {showToPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onToDateChange}
          />
        )}

        {/* Save Button */}
        <View className="items-center mt-6 mb-6">
          <TouchableOpacity 
            className="bg-ochre-200 py-4 px-16 rounded-full"
            onPress={() => {
              if (fromDate) {
                setVacation(fromDate, toDate || undefined);
                router.back();
              }
            }}
          >
            <Text className="text-cream text-lg font-semibold">
              SAVE VACATION
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text className="text-espresso-100 text-center text-base leading-6">
          No delivery would be made in your vacation{'\n'}period
        </Text>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddVacation;
