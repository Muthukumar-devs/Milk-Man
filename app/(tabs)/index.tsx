import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet, Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import CalendarDays from '../../components/CalendarDays';
import DiscountTrials from '../../components/DiscountTrials';
import ImageSlider from '../../components/ImageSlider';
import MembershipCard from '../../components/MembershipCard';
import NewLaunches from '../../components/NewLaunches';
import PopularProducts from '../../components/PopularProducts';
import ProductCard from '../../components/ProductCard';
import Toast from '../../components/Toast';
import { useCart } from '../../context/CartContext';
import productsData from '../../data/products';

const HomeScreen = () => {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(0);
  const [newLaunchProducts, setNewLaunchProducts] = React.useState(productsData.newLaunches);
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastProductName, setToastProductName] = React.useState('');
  const [subscriptionProducts, setSubscriptionProducts] = React.useState([
    { id: 's1', name: 'A2 Cow Milk', size: '500 ml', price: 70, originalPrice: 85, quantity: 1, image: require('../../assets/images/milk.jpg') },
    { id: 's2', name: 'A2 Cow Milk', size: '1 Ltr', price: 130, originalPrice: 160, quantity: 0, image: require('../../assets/images/milk.jpg') },
    { id: 's3', name: 'Buffalo Milk', size: '500 ml', price: 65, originalPrice: 80, quantity: 0, image: require('../../assets/images/milk.jpg') },
    { id: 's4', name: 'Toned Milk', size: '500 ml', price: 55, originalPrice: 65, quantity: 0, image: require('../../assets/images/milk.jpg') },
  ]);

  const handleQuantityChange = (id: string, quantity: number) => {
    const product = subscriptionProducts.find(p => p.id === id);
    if (product && quantity > product.quantity) {
      addItem({ ...product, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=60&h=60&fit=crop' });
      setToastProductName(product.name);
      setToastVisible(true);
    }
    setSubscriptionProducts(prev =>
      prev.map(p => p.id === id ? { ...p, quantity } : p)
    );
  };

  const handleNewLaunchQuantityChange = (id: string, quantity: number) => {
    const product = newLaunchProducts.find(p => p.id === id);
    if (product && quantity > product.quantity) {
      addItem({ ...product, image: product.image });
      setToastProductName(product.name);
      setToastVisible(true);
    }
    setNewLaunchProducts(prev =>
      prev.map(p => p.id === id ? { ...p, quantity } : p)
    );
  };

  const sliderImages = [
    require('../../assets/images/banner2.jpg'),
    require('../../assets/images/splash.jpg'),
  ];

  const generateCalendarDays = () => {
    const statuses = ['scheduled', 'scheduled', 'normal', 'normal', 'suspended', 'vacation', 'vacation'];
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        day: d.getDate().toString(),
        label: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        status: statuses[i],
      });
    }
    return days;
  };
  const calendarDays = React.useMemo(() => generateCalendarDays(), []);

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      {/* Header (Glassmorphism) */}
      <View style={styles.headerWrapper}>
        <BlurView intensity={70} tint="light" style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
            <TouchableOpacity onPress={() => router.push('/vip-membership')} style={{ marginLeft: 4 }}>
              <Image
                source={require('../../assets/images/vip_button_graphic.png')}
                style={{ width: 50, height: 22, borderRadius: 4 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.searchIcon} onPress={() => router.push('/search')}>
              <Ionicons name="search" size={22} color="#4E342E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.walletContainer} onPress={() => router.push('/wallet')}>
              <Image
                source={require('../../assets/images/wallet_btn.png')}
                style={{ width: 22, height: 22, borderRadius: 11, marginRight: 4 }}
                resizeMode="cover"
              />
              <Text style={styles.walletText}>₹ 100</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 70, paddingBottom: 100 }}
      >
        {/* Banner Slider */}
        <ImageSlider
          videoSource={require('../../assets/videos/logo.mp4')}
          images={sliderImages}
          height={170}
        />



        <View className="mx-4 mt-6 mb-2 rounded-3xl overflow-hidden shadow-sm border border-[#D4BE8B]/30">
          <LinearGradient
            colors={['#FFFDF6', '#F4E9D8']}
            style={{ padding: 16 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-xl font-bold text-[#3E2723]">Quick Calendar</Text>
                <Text className="text-xs text-[#5D4037] mt-0.5">Manage your deliveries</Text>
              </View>
              <TouchableOpacity
                className="bg-[#3E2723]/5 px-3 py-2 rounded-full flex-row items-center border border-[#3E2723]/10"
                onPress={() => router.push('/calendar')}
              >
                <Ionicons name="calendar-outline" size={18} color="#3E2723" />
              </TouchableOpacity>
            </View>

            <View className="bg-white/60 rounded-2xl py-3 border border-white/80 shadow-sm mb-4">
              <CalendarDays
                days={calendarDays}
                selectedIndex={selectedDayIndex}
                onDayPress={setSelectedDayIndex}
              />
            </View>

            <View className="flex-row flex-wrap justify-between px-1">
              {[
                { color: '#ff4444', label: 'Vacation' },
                { color: '#00cc88', label: 'Scheduled' },
                { color: '#F59E0B', label: 'Suspended' },
                { color: '#D4BE8B', label: 'No Delivery' },
              ].map(item => (
                <View key={item.label} className="flex-row items-center bg-[#3E2723]/5 px-2.5 py-1.5 rounded-full mb-2 border border-[#3E2723]/5">
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: item.color, marginRight: 6 }} />
                  <Text className="text-[#3E2723] text-[10px] font-bold tracking-wide uppercase">{item.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* My Subscription Products */}
        <View className="bg-cream-100 pb-4 mt-4">
          <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
            <Text className="text-lg font-bold text-espresso">My Subscription</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/subscriptions')}>
              <Text className="text-espresso text-sm font-semibold">Manage →</Text>
            </TouchableOpacity>
          </View>
          <ProductCard products={subscriptionProducts} onQuantityChange={handleQuantityChange} />
          <View className="flex-row justify-between items-center mt-3 px-4">
            <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
              <Text className="text-red-500 text-sm font-bold">+ Add More Products</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-ochre-200 rounded-3xl py-2 px-10">
              <Text className="text-cream text-sm font-bold">SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* VIP Membership */}
        <View className="mt-4">
          <MembershipCard />
        </View>

        {/* Milk Categories */}
        <View className="mt-4 px-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-espresso">Shop by Category</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
              <MaterialCommunityIcons name="chevron-right" size={26} color="#4E342E" />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap" style={{ gap: 10 }}>
            {[
              { key: 'milk', label: 'Milk', icon: 'bottle-soda-outline', color: '#EBF5FF' },
              { key: 'dairy', label: 'Dairy', icon: 'cheese', color: '#FFF3E0' },
              { key: 'curd', label: 'Curd & Yogurt', icon: 'bowl-mix-outline', color: '#F0FFF4' },
              { key: 'ghee', label: 'Ghee', icon: 'pot-steam-outline', color: '#FFF5F5' },
            ].map(cat => (
              <TouchableOpacity
                key={cat.key}
                className="items-center justify-center rounded-2xl py-4 shadow-sm"
                style={{ width: '48%', backgroundColor: cat.color, borderWidth: 1, borderColor: '#DFCDA2' }}
                onPress={() => router.push({ pathname: '/(tabs)/products', params: { category: cat.key } })}
              >
                <MaterialCommunityIcons name={cat.icon as any} size={32} color="#3E2723" />
                <Text className="text-sm font-semibold text-espresso mt-2">{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Milk Products */}
        <View className="mt-6 mb-2">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-xl font-bold text-espresso">Popular Milk</Text>
            <MaterialCommunityIcons name="chevron-right" size={26} color="#4E342E" />
          </View>
          <FlatList
            data={productsData.popularProducts}
            renderItem={({ item }) => <PopularProducts products={[item]} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        {/* Trial Packs */}
        <View className="mt-4 mb-4">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-xl font-bold text-espresso">Trial Packs</Text>
            <MaterialCommunityIcons name="chevron-right" size={26} color="#4E342E" />
          </View>
          <FlatList
            data={productsData.discountTrials}
            renderItem={({ item }) => <DiscountTrials trials={[item]} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>


        {/* New Launches */}
        <NewLaunches
          products={newLaunchProducts}
          onQuantityChange={handleNewLaunchQuantityChange}
        />
      </ScrollView>

      <Toast
        visible={toastVisible}
        productName={toastProductName}
        onGoToCart={() => { setToastVisible(false); router.push('/cart'); }}
        onHide={() => setToastVisible(false)}
        bottomOffset={100}
      />
    </Animated.View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF6' },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, borderRadius: 8, marginRight: 8 },
  greeting: { fontSize: 13, color: '#3E2723', fontWeight: 'bold' },
  name: { fontSize: 18, fontWeight: '800', color: '#4E342E' },
  searchIcon: { marginRight: 10, backgroundColor: '#f0f0f0', padding: 6, borderRadius: 20 },
  walletContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 20,
    borderWidth: 1, borderColor: '#D4BE8B'
  },
  walletText: { color: '#3E2723', fontWeight: 'bold', fontSize: 13 },
  content: { flex: 1, backgroundColor: '#FAF6E9' },
});
