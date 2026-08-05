import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import transactionsData from '../data/transactions.json';

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'debit' | 'credit';
  balance: number;
  category: string;
}

const WalletTransactions = () => {
  const params = useLocalSearchParams();
  const currentBalance = params.balance ? parseInt(params.balance as string) : transactionsData.currentBalance;
  const transactions = transactionsData.transactions;

  const renderTransactionIcon = (type: 'debit' | 'credit') => {
    return (
      <View className={`w-8 h-8 rounded-full items-center justify-center ${
        type === 'credit' ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <Ionicons 
          name={type === 'credit' ? 'arrow-down' : 'arrow-up'} 
          size={16} 
          color={type === 'credit' ? '#10B981' : '#EF4444'} 
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-cream">
      
      {/* Header */}
      <View className="bg-cream px-4 py-4 border-b border-cream-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4 p-1"
            >
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-espresso">
              Wallet Transactions
            </Text>
          </View>
        </View>
      </View>

      {/* Balance Card */}
      <View className="mx-4 mt-4 bg-cream rounded-2xl p-4 shadow-sm border border-cream-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-8 bg-ochre-200 rounded-lg mr-3 items-center justify-center">
              <Ionicons name="wallet" size={16} color="white" />
            </View>
            <View>
              <Text className="text-sm text-ochre-200 mb-1">Balance</Text>
              <Text className="text-2xl font-bold text-espresso">₹{currentBalance}</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="bg-ochre-200 px-6 py-3 rounded-full"
            onPress={() => router.push('/wallet')}
          >
            <Text className="text-cream font-semibold">ADD MONEY</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transactions List */}
      <View className="mx-4 mt-4 bg-cream rounded-2xl overflow-hidden">
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {transactions.map((transaction, index) => (
            <View key={transaction.id} className={`p-4 ${index < transactions.length - 1 ? 'border-b border-cream-200' : ''}`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  {renderTransactionIcon(transaction.type as any)}
                  <View className="ml-3 flex-1">
                    <Text className="text-base font-medium text-espresso mb-1">
                      {transaction.title}
                    </Text>
                    {transaction.date && (
                      <Text className="text-sm text-ochre-200">
                        {transaction.date}
                      </Text>
                    )}
                  </View>
                </View>
                
                <View className="items-end">
                  <Text className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount}
                  </Text>
                  <Text className="text-sm text-ochre-200 mt-1">
                    ₹{transaction.balance}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default WalletTransactions;
