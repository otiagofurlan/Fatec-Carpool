import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ route }: Props) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Bem-vinda ao Fatec Carpool!</Text>
      <Text style={styles.subtitle}>Você está logada como: {email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' },
});
