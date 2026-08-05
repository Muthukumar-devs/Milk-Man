import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const tabOrder = ["index", "products", "offer", "subscriptions", "account"];

  const labelMap: Record<string, string> = {
    index: "HOME",
    products: "PRODUCTS",
    offer: "OFFER",
    subscriptions: "SUBSCRIBE",
    account: "ACCOUNT",
  };

  const iconMap: Record<string, { focused: string; unfocused: string }> = {
    index: { focused: "home", unfocused: "home-outline" },
    products: { focused: "grid", unfocused: "grid-outline" },
    offer: { focused: "brightness-percent", unfocused: "brightness-percent" },
    subscriptions: { focused: "calendar-outline", unfocused: "calendar-outline" },
    account: { focused: "account", unfocused: "account" },
  };

  return (
    <View style={styles.container}>
      {/* Background Blur View with rounded corners */}
      <BlurView intensity={60} tint="light" style={styles.blurContainer} />

      {/* Tabs placed on top, so the offer button can pop out without clipping */}
      <View style={styles.tabsWrapper}>
        {tabOrder.map((routeName, index) => {
          const route = state.routes.find(r => r.name === routeName);
          if (!route) return null;

          const focused = state.index === state.routes.findIndex(r => r.name === routeName);
          const label = labelMap[routeName] ?? routeName.toUpperCase();
          const iconName = focused ? iconMap[routeName]?.focused : iconMap[routeName]?.unfocused;

          const isOffer = routeName === "offer";
          const iconColor = focused ? "#3E2723" : "#D4BE8B";

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              {isOffer ? (
                <View style={styles.exploreWrapper}>
                  <BlurView intensity={80} tint="light" style={styles.exploreCircle}>
                    <MaterialCommunityIcons name={iconName as any} size={28} color="#3E2723" />
                  </BlurView>
                </View>
              ) : (
                <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                  {routeName === "subscriptions" || routeName === "account" ? (
                    <MaterialCommunityIcons name={iconName as any} size={22} color={iconColor} />
                  ) : (
                    <Ionicons name={iconName as any} size={22} color={iconColor} />
                  )}
                  {focused && (
                    <Text
                      style={[styles.label, { color: iconColor }]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {label}
                    </Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    height: 65,
    shadowColor: "#EADCB9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 253, 246, 0.7)", // Cream tint for glassmorphism
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 33,
    overflow: "hidden",
  },
  tabsWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    width: "100%",
  },
  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  exploreWrapper: {
    top: -20, // Floating circle above the bar
    alignItems: "center",
    justifyContent: "center",
  },
  exploreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(234, 220, 185, 0.8)", // Ochre tint
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFDF6",
    shadowColor: "#EADCB9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    overflow: "hidden",
  },
  label: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
});

export default CustomTabBar;
