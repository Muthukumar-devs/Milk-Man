import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import offersData from '../../data/offers.json';
import BannerOfferCard from '../../components/BannerOfferCard';
import VipOfferCard from '../../components/VipOfferCard';
import FlashDealCard from '../../components/FlashDealCard';
import CategoryOfferCard from '../../components/CategoryOfferCard';
import CouponCard from '../../components/CouponCard';
import LoyaltyRewardCard from '../../components/LoyaltyRewardCard';

const offers = () => {
  const copyCode = async (code: string) => {
    await Clipboard.setStringAsync(code);
    Alert.alert('Copied!', `Code ${code} copied to clipboard`);
  };

  const handleRedeem = () => {
    Alert.alert('Redeem Points', 'Redirecting to rewards catalog...');
  };

  // Dynamic loyalty data
  const loyaltyData = {
    points: 2750,
    tier: 'Gold' as const,
    nextTierPoints: 5000
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Offers & Deals</Text>
        {/* <Ionicons name="notifications-outline" size={24} color="#4E342E" /> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Offers */}
        <FlatList
          data={offersData.bannerOffers}
          renderItem={({ item }) => (
            <BannerOfferCard offer={item} onCopyCode={copyCode} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerContainer}
        />

        {/* VIP Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👑 VIP Exclusive</Text>
          <FlatList
            data={offersData.vipOffers}
            renderItem={({ item }) => (
              <VipOfferCard offer={item} onCopyCode={copyCode} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vipContainer}
          />
        </View>

        {/* Loyalty & Rewards */}
        <View style={styles.section}>
          <LoyaltyRewardCard
            points={loyaltyData.points}
            tier={loyaltyData.tier}
            nextTierPoints={loyaltyData.nextTierPoints}
            onRedeem={handleRedeem}
          />
        </View>

        {/* Flash Deals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Flash Deals</Text>
          {offersData.flashDeals.map((item) => (
            <FlashDealCard key={item.id} deal={item} />
          ))}
        </View>

        {/* Category Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏷️ Category Offers</Text>
          <FlatList
            data={offersData.categoryOffers}
            renderItem={({ item }) => (
              <CategoryOfferCard offer={item} onCopyCode={copyCode} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          />
        </View>

        {/* Coupons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ My Coupons</Text>
          {offersData.coupons.map((item) => (
            <CouponCard key={item.id} coupon={item} onCopyCode={copyCode} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default offers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E2723',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#3E2723',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4BE8B',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D4BE8B',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  vipContainer: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    paddingHorizontal: 16,
  },
});
