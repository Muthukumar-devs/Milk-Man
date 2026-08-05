import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  used: boolean;
}

interface CouponCardProps {
  coupon: Coupon;
  onCopyCode: (code: string) => void;
}

const CouponCard = ({ coupon, onCopyCode }: CouponCardProps) => {
  return (
    <View style={[styles.container, coupon.used && styles.usedCoupon]}>
      <ImageBackground
        source={require('../assets/images/coupon_graphic.png')}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 12 }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.left}>
            <Text style={styles.title}>{coupon.title}</Text>
            <Text style={styles.description}>{coupon.description}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.codeButton, coupon.used && styles.usedCodeButton]}
            onPress={() => !coupon.used && onCopyCode(coupon.code)}
            disabled={coupon.used}
          >
            <Text style={[styles.codeText, coupon.used && styles.usedCodeText]}>
              {coupon.code}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#3E2723',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageBackground: {
    width: '100%',
  },
  overlay: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(62, 39, 35, 0.4)',
    borderRadius: 12,
  },
  usedCoupon: {
    opacity: 0.6,
  },
  left: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4BE8B',
  },
  description: {
    fontSize: 14,
    color: '#FFFDF6',
    marginTop: 6,
    opacity: 0.9,
  },
  codeButton: {
    backgroundColor: '#D4BE8B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  usedCodeButton: {
    backgroundColor: '#5D4037',
    borderColor: '#4E342E',
  },
  codeText: {
    color: '#3E2723',
    fontWeight: 'bold',
    fontSize: 14,
  },
  usedCodeText: {
    color: '#A1887F',
  },
});

export default CouponCard;
