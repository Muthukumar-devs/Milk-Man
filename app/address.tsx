import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn } from 'react-native-reanimated';

const Address = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [location, setLocation] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleSaveAddress = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-cream" behavior={"padding"}>
      <Animated.View entering={FadeIn} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 mt-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#3E2723" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-espresso ml-4">
            Address
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Google Map */}
          <View className="h-80">
            <MapView
              style={{ flex: 1 }}
              provider="google"
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={location}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your Location"
                description="Current location"
              />
            </MapView>
          </View>

          {/* Add Delivery Address */}
          <Text className="text-xl font-bold text-espresso text-center my-8">
            ADD DELIVERY ADDRESS
          </Text>

          {/* Pin Location */}
          <TouchableOpacity 
            className="flex-row items-center px-4 py-4 mb-6 bg-cream"
            onPress={() => router.push('/map-picker')}
          >
            <View className="w-8 h-8 bg-ochre-200 rounded-lg items-center justify-center mr-4">
              <Ionicons name="location" size={16} color="#3E2723" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-espresso">
                PIN LOCATION ON MAP
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#3E2723" />
          </TouchableOpacity>

          {/* Form Fields */}
          <View className="px-4">
            <View className="bg-cream border border-ochre-100 rounded-2xl px-4 mb-4">
              <TextInput
                className="text-lg text-espresso py-3"
                placeholder="City"
                placeholderTextColor="#D4BE8B"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View className="bg-cream border border-ochre-100 rounded-2xl px-4 mb-4">
              <TextInput
                className="text-lg text-espresso py-3"
                placeholder="Area"
                placeholderTextColor="#D4BE8B"
                value={area}
                onChangeText={setArea}
              />
            </View>

            <View className="bg-cream border border-ochre-100 rounded-2xl px-4 mb-8">
              <TextInput
                className="text-lg text-espresso py-3"
                placeholder="Street Address"
                placeholderTextColor="#D4BE8B"
                value={streetAddress}
                onChangeText={setStreetAddress}
                multiline
              />
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View className="px-4 pb-8">
          <TouchableOpacity
            className="bg-ochre-200 py-4 rounded-full"
            onPress={handleSaveAddress}
          >
            <Text className="text-espresso text-center text-lg font-bold">
              SAVE ADDRESS
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Address;
