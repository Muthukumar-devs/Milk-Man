import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Complaint = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const complaintCategories = [
    { id: 'delivery', title: 'Delivery Issue', icon: 'car-outline' },
    { id: 'product', title: 'Product Quality', icon: 'cube-outline' },
    { id: 'payment', title: 'Payment Issue', icon: 'card-outline' },
    { id: 'app', title: 'App Problem', icon: 'phone-portrait-outline' },
    { id: 'other', title: 'Other', icon: 'help-circle-outline' },
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !subject || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Your complaint has been submitted successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Raise Complaint</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Category Selection */}
        <View className="bg-cream mx-4 mt-4 rounded-xl p-4 ">
          <Text className="text-lg font-semibold text-espresso mb-3">Select Category</Text>
          <TouchableOpacity 
            className="flex-row items-center justify-between p-3 border border-cream-200 rounded-lg"
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <View className="flex-row items-center">
              {selectedCategory ? (
                <>
                  <Ionicons 
                    name={complaintCategories.find(c => c.id === selectedCategory)?.icon as any} 
                    size={20} 
                    color="#4E342E" 
                  />
                  <Text className="ml-2 text-espresso-100">
                    {complaintCategories.find(c => c.id === selectedCategory)?.title}
                  </Text>
                </>
              ) : (
                <Text className="text-ochre-200">Choose complaint category</Text>
              )}
            </View>
            <Ionicons name={dropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#4E342E" />
          </TouchableOpacity>
          
          {dropdownOpen && (
            <View className="mt-2 border border-cream-200 rounded-lg bg-cream">
              {complaintCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className="flex-row items-center p-3 border-b border-cream-200 last:border-b-0"
                  onPress={() => {
                    setSelectedCategory(category.id);
                    setDropdownOpen(false);
                  }}
                >
                  <Ionicons name={category.icon as any} size={20} color="#4E342E" />
                  <Text className="ml-2 text-espresso-100">{category.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Subject Input */}
        <View className="bg-cream mx-4 mt-4 rounded-xl p-4 ">
          <Text className="text-lg font-semibold text-espresso mb-3">Subject</Text>
          <TextInput
            className="border border-cream-200 rounded-lg p-3 text-espresso-100"
            placeholder="Brief description of your issue"
            value={subject}
            onChangeText={setSubject}
            maxLength={100}
          />
          <Text className="text-xs text-ochre-200 mt-1">{subject.length}/100</Text>
        </View>

        {/* Description Input */}
        <View className="bg-cream mx-4 mt-4 rounded-xl p-4">
          <Text className="text-lg font-semibold text-espresso mb-3">Description</Text>
          <TextInput
            className="border border-cream-200 rounded-lg p-3 text-espresso-100 h-32"
            placeholder="Please provide detailed information about your complaint..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
          <Text className="text-xs text-ochre-200 mt-1">{description.length}/500</Text>
        </View>

        {/* Contact Info */}
        <View className="bg-cream-200 mx-4 mt-4 rounded-xl p-4 border border-ochre-200">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#3b82f6" />
            <Text className="text-espresso font-medium ml-2">Contact Information</Text>
          </View>
          <Text className="text-espresso-100 text-sm">
            Our support team will contact you within 24 hours regarding your complaint.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-red-500 mx-4 mt-6 mb-8 rounded-xl p-3"
          onPress={handleSubmit}
        >
          <Text className="text-cream text-center text-lg font-semibold">Submit Complaint</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Complaint;
