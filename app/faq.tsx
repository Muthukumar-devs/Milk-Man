import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FAQ = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const faqCategories = [
    { title: 'Account', hasChevron: true },
    { title: 'Dairy Products', hasChevron: true },
    { title: 'Grocery Products', hasChevron: true },
    { title: 'Fruits & Veggies', hasChevron: true },
    { title: 'VIP Membership', hasChevron: true },
    { title: 'Payment', hasChevron: true },
    { title: 'Delivery', hasChevron: true },
    { title: 'App', hasChevron: true },
  ];

  const faqData: Record<string, Array<{question: string, answer: string}>> = {
    'Account': [
      { question: 'How do I create an account?', answer: 'You can create an account by downloading the app and following the registration process.' },
      { question: 'How do I reset my password?', answer: 'Use the "Forgot Password" option on the login screen to reset your password.' }
    ],
    'Dairy Products': [
      { question: 'Are your dairy products fresh?', answer: 'Yes, all our dairy products are sourced fresh daily from trusted suppliers.' },
      { question: 'What is A2 milk?', answer: 'A2 milk comes from cows that produce only A2 beta-casein protein, which is easier to digest.' }
    ],
    'Grocery Products': [
      { question: 'Do you deliver groceries daily?', answer: 'Yes, we provide daily grocery delivery services in your area.' },
      { question: 'What brands do you carry?', answer: 'We carry a wide range of trusted local and national brands.' }
    ],
    'Fruits & Veggies': [
      { question: 'Are fruits and vegetables organic?', answer: 'We offer both organic and conventional options, clearly labeled for your choice.' },
      { question: 'How fresh are the produce?', answer: 'All produce is sourced fresh daily from local farms and suppliers.' }
    ],
    'VIP Membership': [
      { question: 'What are VIP membership benefits?', answer: 'VIP members get exclusive discounts, free delivery, and priority customer support.' },
      { question: 'How much does VIP membership cost?', answer: 'VIP membership plans start from ₹99 per month with various options available.' }
    ],
    'Payment': [
      { question: 'What payment methods do you accept?', answer: 'We accept UPI, credit/debit cards, net banking, and cash on delivery.' },
      { question: 'Is my payment information secure?', answer: 'Yes, all payments are processed through secure, encrypted channels.' }
    ],
    'Delivery': [
      { question: 'What are your delivery hours?', answer: 'We deliver from 6 AM to 10 PM, 7 days a week.' },
      { question: 'Do you charge for delivery?', answer: 'Delivery is free for orders above ₹300. VIP members get free delivery on all orders.' }
    ],
    'App': [
      { question: 'How do I update the app?', answer: 'You can update the app through your device\'s app store when updates are available.' },
      { question: 'The app is not working properly', answer: 'Try restarting the app or contact our support team for assistance.' }
    ]
  };

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">FAQ</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 pt-4">
          {faqCategories.map((category, index) => (
            <View key={index}>
              <TouchableOpacity 
                className="flex-row items-center justify-between py-4 border-b border-cream-200"
                onPress={() => toggleCategory(category.title)}
              >
                <Text className="text-base text-espresso-100 font-medium">{category.title}</Text>
                <Ionicons 
                  name={expandedCategory === category.title ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#4E342E" 
                />
              </TouchableOpacity>
              
              {expandedCategory === category.title && (
                <View className="pb-4">
                  {faqData[category.title]?.map((faq, faqIndex) => (
                    <View key={faqIndex} className="mb-4 pl-4">
                      <Text className="text-sm font-medium text-espresso mb-2">Q: {faq.question}</Text>
                      <Text className="text-sm text-espresso-100 leading-5">A: {faq.answer}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <View className="h-8" />
      </ScrollView>
    </View>
  );
};

export default FAQ;
