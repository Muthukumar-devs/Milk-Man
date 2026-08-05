import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface FlashDeal {
  id: string;
  title: string;
  timeLeft: string;
  product: string;
  salePrice: number;
  originalPrice: number;
  discount: string;
  image: string;
}

interface FlashDealCardProps {
  deal: FlashDeal;
}

const FlashDealCard = ({ deal }: FlashDealCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{deal.title}</Text>
        <Text style={styles.timeLeft}>{deal.timeLeft}</Text>
      </View>
      <View style={styles.content}>
        <Image source={deal.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.product}>{deal.product}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.salePrice}>₹{deal.salePrice}</Text>
            <Text style={styles.originalPrice}>₹{deal.originalPrice}</Text>
            <Text style={styles.discount}>{deal.discount} OFF</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFDF6',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  timeLeft: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  product: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4E342E',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  salePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00cc88',
  },
  originalPrice: {
    fontSize: 14,
    color: '#D4BE8B',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discount: {
    fontSize: 12,
    color: '#FFFDF6',
    backgroundColor: '#ff4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default FlashDealCard;
