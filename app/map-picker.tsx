import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapPicker = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState({
     latitude: 13.0827,
    longitude: 80.2707,
  });
  const [region, setRegion] = useState({
     latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      
      let currentLocation = await Location.getCurrentPositionAsync({});
      const newLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setSelectedLocation(newLocation);
      setRegion({
        ...newLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = (event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleDone = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 mt-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Address</Text>
      </View>

      {/* Full Screen Map */}
      <View className="flex-1">
        <MapView
          style={{ flex: 1 }}
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={region}
          onPress={handleMapPress}
        >
          <Marker
            coordinate={selectedLocation}
            draggable
            onDragEnd={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
          />
        </MapView>
        
        {/* Drag instruction */}
        {/* <View className="absolute bottom-32 left-4 right-4">
          <Text className="text-center text-espresso-100 bg-cream px-4 py-2 rounded-lg">
            Drag map to place map marker at correct place
          </Text>
        </View> */}
      </View>

      {/* Bottom Section */}
      <View className="bg-cream px-4 py-4">
        {/* Selected Address */}
        <View className="flex-row items-center mb-4">
          <View className="w-8 h-8 bg-ochre-200 rounded-lg items-center justify-center mr-3">
            <Ionicons name="location" size={16} color="white" />
          </View>
          <Text className="text-lg font-semibold text-espresso">Selected address</Text>
        </View>

        {/* Done Button */}
        <TouchableOpacity 
          className="bg-ochre-200 py-4 rounded-full"
          onPress={handleDone}
        >
          <Text className="text-cream text-center text-lg font-bold">DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapPicker;
