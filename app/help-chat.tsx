import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const HelpChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you. What can I assist you with today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isBot: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. Our support team will help you with this shortly.',
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-cream" 
      behavior={'padding'}
      keyboardVerticalOffset={30}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-cream border-b border-cream-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#4E342E" />
          </TouchableOpacity>
          <View className="ml-4">
            <Text className="text-xl font-semibold text-espresso">Support Chat</Text>
            <Text className={`text-sm ${isOnline ? 'text-green-500' : 'text-ochre-200'}`}>
              ● {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4 py-4">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 ${message.isBot ? 'items-start' : 'items-end'}`}
          >
            <View
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.isBot
                  ? 'bg-cream-100 rounded-bl-sm'
                  : 'bg-ochre-200 rounded-br-sm'
              }`}
            >
              <Text
                className={`text-base ${
                  message.isBot ? 'text-espresso' : 'text-cream'
                }`}
              >
                {message.text}
              </Text>
            </View>
            <Text className="text-xs text-ochre-200 mt-1 px-2">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="flex-row items-center px-4 py-4 border-t border-cream-200">
        <TextInput
          className="flex-1 bg-cream-100 rounded-full px-4 py-3 mr-3"
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          className="bg-ochre-200 w-12 h-12 rounded-full items-center justify-center"
          onPress={sendMessage}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HelpChat;
