import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<any>('/onboarding');

  useEffect(() => {
    async function checkAuth() {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          setInitialRoute('/(tabs)');
        } else if (hasOnboarded === 'true') {
          setInitialRoute('/login');
        }
      } catch (e) {
      } finally {
        setIsReady(true);
      }
    }
    checkAuth();
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 bg-cream justify-center items-center">
        <ActivityIndicator size="large" color="#EADCB9" />
      </View>
    );
  }

  return <Redirect href={initialRoute} />;
}
