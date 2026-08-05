import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface CategoryOffer {
  id: string;
  title: string;
  description: string;
  code: string;
  image: string;
}

interface CategoryOfferCardProps {
  offer: CategoryOffer;
  onCopyCode: (code: string) => void;
}

const CategoryOfferCard = ({ offer, onCopyCode }: CategoryOfferCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={offer.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <TouchableOpacity 
          style={styles.codeButton}
          onPress={() => onCopyCode(offer.code)}
        >
          <Text style={styles.codeText}>{offer.code}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: '#FFFDF6',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  description: {
    fontSize: 12,
    color: '#4E342E',
    marginVertical: 4,
  },
  codeButton: {
    backgroundColor: '#3E2723',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  codeText: {
    color: '#FFFDF6',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CategoryOfferCard;
