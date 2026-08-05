import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

type TierType = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

interface LoyaltyRewardCardProps {
  points: number;
  tier: TierType;
  nextTierPoints: number;
  onRedeem: () => void;
}

const LoyaltyRewardCard: React.FC<LoyaltyRewardCardProps> = ({
  points,
  tier,
  nextTierPoints,
  onRedeem
}) => {
  const progress = (points / nextTierPoints) * 100;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const getTierColor = (tier: TierType) => {
    switch (tier) {
      case 'Bronze': return '#CD7F32';
      case 'Silver': return '#C0C0C0';
      case 'Gold': return '#FFD700';
      case 'Platinum': return '#E5E4E2';
      case 'Diamond': return '#B9F2FF';
      default: return '#FFD700';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>🎁 Loyalty & Rewards</Text>
        <Text style={[styles.tier, { backgroundColor: getTierColor(tier) }]}>{tier}</Text>
      </View>
      
      <View style={styles.pointsSection}>
        <Text style={styles.pointsLabel}>Your Points</Text>
        <Text style={styles.pointsValue}>{points.toLocaleString()}</Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill, 
              { 
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', `${Math.min(progress, 100)}%`],
                  extrapolate: 'clamp'
                })
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {nextTierPoints - points} points to next tier
        </Text>
      </View>

      <TouchableOpacity style={styles.redeemButton} onPress={onRedeem}>
        <Text style={styles.redeemText}>Redeem Points</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoyaltyRewardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3E2723',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D4BE8B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4BE8B',
  },
  tier: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#FFFDF6',
    opacity: 0.9,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D4BE8B',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(212, 190, 139, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4BE8B',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFDF6',
    opacity: 0.8,
    textAlign: 'center',
  },
  redeemButton: {
    backgroundColor: '#D4BE8B',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  redeemText: {
    color: '#3E2723',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
