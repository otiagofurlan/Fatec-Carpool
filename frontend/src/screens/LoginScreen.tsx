import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Defina o tipo da pilha de navegação
type RootStackParamList = {
  Login: undefined;
  Home: undefined; // Adicione outras telas conforme necessário
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://<SEU_IP>:3000/api/login', {
        email,
        senha,
      });

      if (response.data.success) {
        Alert.alert('Login realizado com sucesso!');
        navigation.navigate('Home'); // ajuste conforme as telas do seu app
      } else {
        Alert.alert('Falha no login', response.data.message);
      }
    } catch (error) {
      Alert.alert('Erro ao conectar', 'Verifique seu backend.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fatec Carpool - Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
