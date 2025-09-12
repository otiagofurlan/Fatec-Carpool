import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Send, Paperclip } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
  userName: string;
  userAvatar: string;
}

export default function ChatScreen() {
  const { userId } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:30:00'),
      isCurrentUser: true,
      userName: 'Você',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '2',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:32:00'),
      isCurrentUser: false,
      userName: 'Tiago Santos Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '3',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:33:00'),
      isCurrentUser: false,
      userName: 'Tiago Santos Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '4',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:35:00'),
      isCurrentUser: true,
      userName: 'Você',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '5',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:36:00'),
      isCurrentUser: true,
      userName: 'Você',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '6',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:38:00'),
      isCurrentUser: false,
      userName: 'Tiago Santos Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '7',
      text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
      timestamp: new Date('2025-07-20T10:40:00'),
      isCurrentUser: true,
      userName: 'Você',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        timestamp: new Date(),
        isCurrentUser: true,
        userName: 'Você',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(msg => {
      const dateKey = formatDate(msg.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(msg);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  useEffect(() => {
    // Scroll to bottom on mount
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#FCFCFC" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerSubtitle}>bate-papo com</Text>
            <Text style={styles.headerTitle}>Tiago Santos Furlan</Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(messageGroups).map(([date, msgs]) => (
            <View key={date}>
              {/* Date Separator */}
              <View style={styles.dateSeparator}>
                <Text style={styles.dateText}>{date}</Text>
              </View>
              
              {/* Messages for this date */}
              {msgs.map((msg) => (
                <View 
                  key={msg.id} 
                  style={[
                    styles.messageRow,
                    msg.isCurrentUser ? styles.messageRowRight : styles.messageRowLeft
                  ]}
                >
                  {!msg.isCurrentUser && (
                    <Image source={{ uri: msg.userAvatar }} style={styles.avatar} />
                  )}
                  
                  <View 
                    style={[
                      styles.messageBubble,
                      msg.isCurrentUser ? styles.messageBubbleRight : styles.messageBubbleLeft
                    ]}
                  >
                    <Text style={[
                      styles.messageText,
                      msg.isCurrentUser ? styles.messageTextRight : styles.messageTextLeft
                    ]}>
                      {msg.text}
                    </Text>
                  </View>
                  
                  {msg.isCurrentUser && (
                    <Image source={{ uri: msg.userAvatar }} style={styles.avatar} />
                  )}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color="#989898" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Escreva uma mensagem."
            placeholderTextColor="#989898"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, message.trim() ? styles.sendButtonActive : null]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? "#FCFCFC" : "#989898"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#111111',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#989898',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FCFCFC',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 12,
    color: '#989898',
    backgroundColor: '#989898',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageBubbleLeft: {
    backgroundColor: '#10b981',
    borderBottomLeftRadius: 4,
  },
  messageBubbleRight: {
    backgroundColor: '#FFC86A',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextLeft: {
    color: '#FCFCFC',
  },
  messageTextRight: {
    color: '#111111',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FCFCFC',
    borderTopWidth: 1,
    borderTopColor: '#989898',
  },
  attachButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111111',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#989898',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#10b981',
  },
});