import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Calendar, Clock, ChevronDown } from 'lucide-react-native';

export default function OfereceScreen() {
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');
  const [ocupacao, setOcupacao] = useState('');

  const handleUseCurrentLocation = () => {
    // Simulate getting current location
    setCep('18200-003');
    setCidade('Itapetininga');
    setRua('Praça Duque De Caxias');
    setBairro('Centro');
  };

  const handleConfirm = () => {
    Alert.alert('Sucesso', 'Carona oferecida com sucesso!');
  };

  const handleCancel = () => {
    // Clear all fields
    setCep('');
    setCidade('');
    setRua('');
    setBairro('');
    setData('');
    setHorario('');
    setTipo('');
    setModelo('');
    setPlaca('');
    setCor('');
    setOcupacao('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Oferecer Carona</Text>
        </View>

        {/* Destination */}
        <View style={styles.destinationCard}>
          <Text style={styles.destinationText}>
            <Text style={styles.boldText}>Destino:</Text> Fatec Itapetininga.
          </Text>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Endereço de partida:</Text>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={handleUseCurrentLocation}
            >
              <Text style={styles.locationButtonText}>Usar localização Atual</Text>
              <MapPin size={16} color="#989898" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="CEP"
              placeholderTextColor="#989898"
              value={cep}
              onChangeText={setCep}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Cidade"
              placeholderTextColor="#989898"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Rua"
              placeholderTextColor="#989898"
              value={rua}
              onChangeText={setRua}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Bairro"
              placeholderTextColor="#989898"
              value={bairro}
              onChangeText={setBairro}
            />
          </View>
        </View>

        {/* Distance and Price */}
        <View style={styles.distanceCard}>
          <Text style={styles.distanceText}>
            <Text style={styles.boldText}>Distância estimada:</Text> 100km
          </Text>
          <Text style={styles.priceText}>R$50,00</Text>
        </View>

        {/* Date and Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data e Horário</Text>
          
          <View style={styles.inputRow}>
            <TouchableOpacity style={[styles.input, styles.inputHalf, styles.dateTimeInput]}>
              <Text style={[styles.inputText, !data && styles.placeholderText]}>
                {data || 'Data'}
              </Text>
              <Calendar size={20} color="#989898" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.input, styles.inputHalf, styles.dateTimeInput]}>
              <Text style={[styles.inputText, !horario && styles.placeholderText]}>
                {horario || 'Horário'}
              </Text>
              <Clock size={20} color="#989898" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Vehicle Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do veículo:</Text>
          
          <View style={styles.inputRow}>
            <TouchableOpacity style={[styles.input, styles.inputSmall, styles.dropdownInput]}>
              <Text style={[styles.inputText, !tipo && styles.placeholderText]}>
                {tipo || 'Tipo'}
              </Text>
              <ChevronDown size={20} color="#989898" />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.inputLarge]}
              placeholder="Modelo"
              placeholderTextColor="#989898"
              value={modelo}
              onChangeText={setModelo}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputThird]}
              placeholder="Placa"
              placeholderTextColor="#989898"
              value={placa}
              onChangeText={setPlaca}
            />
            <TextInput
              style={[styles.input, styles.inputThird]}
              placeholder="Cor"
              placeholderTextColor="#989898"
              value={cor}
              onChangeText={setCor}
            />
            <TextInput
              style={[styles.input, styles.inputThird]}
              placeholder="Ocupação"
              placeholderTextColor="#989898"
              value={ocupacao}
              onChangeText={setOcupacao}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160, // Espaço para footer (40px) + tabBar (120px)
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#FCFCFC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  destinationCard: {
    backgroundColor: '#F1F1F1',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  destinationText: {
    fontSize: 16,
    color: '#111111',
  },
  boldText: {
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationButtonText: {
    fontSize: 14,
    color: '#989898',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#989898',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111111',
  },
  inputHalf: {
    flex: 1,
  },
  inputSmall: {
    flex: 0.4,
  },
  inputLarge: {
    flex: 0.6,
  },
  inputThird: {
    flex: 1,
  },
  dateTimeInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#111111',
  },
  placeholderText: {
    color: '#989898',
  },
  distanceCard: {
    backgroundColor: '#F1F1F1',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 16,
    color: '#111111',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FFC86A',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
});