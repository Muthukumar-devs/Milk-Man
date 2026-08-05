import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BannerOffer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  image: string;
}

interface BannerOfferCardProps {
  offer: BannerOffer;
  onCopyCode: (code: string) => void;
}

const BannerOfferCard = ({ offer, onCopyCode }: BannerOfferCardProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/images/offer_banner_graphic.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(62,39,35,0.9)']}
          style={styles.gradient}
        >
          <Text style={styles.title}>{offer.title}</Text>
          <Text style={styles.subtitle}>{offer.subtitle}</Text>
          <TouchableOpacity 
            style={styles.codeButton}
            onPress={() => onCopyCode(offer.code)}
          >
            <Text style={styles.codeText}>{offer.code}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#3E2723',
    borderWidth: 1,
    borderColor: '#D4BE8B',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D4BE8B',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFDF6',
    opacity: 0.9,
    marginBottom: 8,
  },
  codeButton: {
    backgroundColor: '#D4BE8B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  codeText: {
    color: '#3E2723',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BannerOfferCard;
