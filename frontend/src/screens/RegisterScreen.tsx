import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post('http://192.168.2.103:3000/api/register', {
        nome,
        email,
        senha,
      });

      if (response.data.success) {
        Alert.alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login'); // volta para a tela de login
      } else {
        Alert.alert('Erro no cadastro', response.data.message);
      }
    } catch (error) {
      Alert.alert('Erro ao conectar', 'Verifique seu backend.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fatec Carpool - Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
