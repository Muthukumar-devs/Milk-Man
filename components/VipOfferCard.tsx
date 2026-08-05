import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VipOffer {
  id: string;
  title: string;
  description: string;
  code: string;
}

interface VipOfferCardProps {
  offer: VipOffer;
  onCopyCode: (code: string) => void;
}

const VipOfferCard = ({ offer, onCopyCode }: VipOfferCardProps) => {
  return (
    <LinearGradient
      colors={['#FDE68A', '#D4BE8B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <MaterialCommunityIcons name="crown" size={24} color="#3E2723" />
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.description}>{offer.description}</Text>
      <TouchableOpacity 
        style={styles.codeButton}
        onPress={() => onCopyCode(offer.code)}
      >
        <Text style={styles.codeText}>{offer.code}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#3E2723',
    opacity: 0.8,
    marginVertical: 8,
  },
  codeButton: {
    backgroundColor: '#3E2723',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  codeText: {
    color: '#FFFDF6',
    fontWeight: 'bold',
  },
});

export default VipOfferCard;
