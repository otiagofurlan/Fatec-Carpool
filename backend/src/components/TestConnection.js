// components/TestConnection.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fatecCarpoolAPI } from '../../../frontend/services/api';

export default function TestConnection() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>('Não testado');

  const testConnection = async () => {
    setIsLoading(true);
    setStatus('Testando...');
    
    try {
      const result = await fatecCarpoolAPI.checkHealth();
      setStatus('✅ Conectado');
      Alert.alert('Sucesso!', `Backend funcionando: ${result.service}`);
    } catch (error) {
      setStatus('❌ Erro');
      Alert.alert('Erro', 'Não foi possível conectar ao backend');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Conexão</Text>
      <Text style={styles.status}>{status}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={testConnection}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Testando...' : 'Testar Backend'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111111',
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});