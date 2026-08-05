import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AccountPreferences = () => {
  const [profile, setProfile] = useState({
    name: 'Mk dev',
    email: 'mkdev@gmail.com',
    alternateNumber: 'Not Set',
    address: '103, Ashok Pillar, Chennai',
    deliveryPreference: 'Ring the bell',
    deliverySlot: 'Early Morning'
  });
  const [editingField, setEditingField] = useState<string | null>(null);

  const accountItems = [
    { 
      title: 'Name', 
      subtitle: profile.name, 
      hasChevron: true,
      field: 'name'
    },
    { 
      title: 'Email', 
      subtitle: profile.email, 
      hasChevron: true,
      field: 'email'
    },
    { 
      title: 'Alternate Number', 
      subtitle: profile.alternateNumber, 
      hasChevron: true,
      field: 'alternateNumber'
    },
    { 
      title: 'Address', 
      subtitle: profile.address, 
      hasChevron: true,
      field: 'address'
    },
    { 
      title: 'Delivery Preference', 
      subtitle: profile.deliveryPreference, 
      hasChevron: true,
      field: 'deliveryPreference'
    },
    { 
      title: 'Delivery Slot', 
      subtitle: profile.deliverySlot, 
      hasChevron: true,
      field: 'deliverySlot'
    },
  ];

  const deliveryPreferenceOptions = ['Ring the bell', 'Leave at door', 'Call before delivery', 'Security guard'];
  const deliverySlotOptions = ['Early Morning', 'Morning', 'Afternoon', 'Evening'];

  const toggleEdit = (field: string) => {
    setEditingField(editingField === field ? null : field);
  };

  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setEditingField(null);
  };

  const getOptions = (field: string) => {
    if (field === 'deliveryPreference') return deliveryPreferenceOptions;
    if (field === 'deliverySlot') return deliverySlotOptions;
    return [];
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Account & Preference</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 pt-4">
          {accountItems.map((item, index) => (
            <View key={index} className="py-4 border-b border-cream-200">
              <TouchableOpacity 
                className="flex-row items-center"
                onPress={() => toggleEdit(item.field)}
              >
                <View className="flex-1">
                  <Text className="text-base text-espresso mb-1">{item.title}</Text>
                  {editingField !== item.field ? (
                    <Text className="text-base text-ochre-200">{item.subtitle}</Text>
                  ) : null}
                </View>
                <Ionicons 
                  name={editingField === item.field ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#ccc" 
                />
              </TouchableOpacity>
              {editingField === item.field && (
                getOptions(item.field).length > 0 ? (
                  <View className="mt-2 border border-cream-200 rounded-lg bg-cream">
                    {getOptions(item.field).map((option, optionIndex) => (
                      <TouchableOpacity
                        key={optionIndex}
                        className="p-3 border-b border-cream-200 last:border-b-0"
                        onPress={() => updateProfile(item.field, option)}
                      >
                        <Text className="text-espresso-100">{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <TextInput
                    className="mt-2 border border-cream-200 rounded-lg p-3 text-espresso-100"
                    value={item.subtitle}
                    onChangeText={(text) => updateProfile(item.field, text)}
                    placeholder={`Enter ${item.title}`}
                    multiline={item.field === 'address'}
                    onBlur={() => setEditingField(null)}
                  />
                )
              )}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center px-8 mt-8 mb-8" style={{gap: 20}}>
          <TouchableOpacity className="border border-red-500 py-3 px-6 rounded-lg">
            <Text className="text-red-500 text-base font-medium text-center">Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-green-500 py-3 px-6 rounded-lg">
            <Text className="text-green-500 text-base font-medium text-center">Save Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountPreferences;
