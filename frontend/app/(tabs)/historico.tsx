import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  UserPlus, 
  Car, 
  Users,
  Bike
} from 'lucide-react-native';
import { router } from 'expo-router';

interface RideHistory {
  id: string;
  type: 'received' | 'offered';
  driverName?: string;
  driverAvatar?: string;
  passengers?: Array<{
    name: string;
    avatar: string;
  }>;
  passengerCount?: number;
  totalSeats?: number;
  location: string;
  price: string;
  duration: string;
  vehicle: string;
  vehicleType: 'car' | 'motorcycle';
  date: string;
  time: string;
  showChatButton?: boolean;
}

export default function HistoricoScreen() {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | null>(null);

  const [rideHistory] = useState<RideHistory[]>([
    {
      id: '1',
      type: 'received',
      driverName: 'Tiago Santos Furlan',
      driverAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      price: 'R$12,50',
      duration: '30 minutos',
      vehicle: 'Onix Branco',
      vehicleType: 'car',
      date: '15/07',
      time: '18:15',
      showChatButton: true
    },
    {
      id: '2',
      type: 'offered',
      passengers: [
        {
          name: 'Tiago',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        {
          name: 'Gabriel',
          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        {
          name: 'Rodrigo',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        {
          name: 'Beatriz',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        }
      ],
      passengerCount: 4,
      totalSeats: 4,
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      duration: '30 minutos',
      vehicle: 'Onix Branco',
      vehicleType: 'car',
      date: '15/07',
      time: '18:15',
      price: ''
    },
    {
      id: '3',
      type: 'offered',
      passengers: [
        {
          name: 'Tiago',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        {
          name: 'Gabriel',
          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        },
        {
          name: 'Rodrigo',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
        }
      ],
      passengerCount: 3,
      totalSeats: 4,
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      duration: '30 minutos',
      vehicle: 'Onix Branco',
      vehicleType: 'car',
      date: '15/07',
      time: '18:15',
      price: ''
    }
  ]);

  const openChat = (userId: string) => {
    router.push(`/chat/${userId}`);
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
          <Text style={styles.title}>Histórico de Caronas</Text>
        </View>

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedDateFilter && styles.filterButtonActive]}
            onPress={() => setSelectedDateFilter(selectedDateFilter ? null : 'date')}
          >
            <Text style={[styles.filterText, selectedDateFilter && styles.filterTextActive]}>
              Data
            </Text>
            <Calendar size={16} color={selectedDateFilter ? "#111111" : "#989898"} />
            <ChevronDown size={16} color={selectedDateFilter ? "#111111" : "#989898"} />
          </TouchableOpacity>

          <View style={styles.filterSeparator} />

          <TouchableOpacity 
            style={[styles.filterButton, selectedTimeFilter && styles.filterButtonActive]}
            onPress={() => setSelectedTimeFilter(selectedTimeFilter ? null : 'time')}
          >
            <Text style={[styles.filterText, selectedTimeFilter && styles.filterTextActive]}>
              Horário
            </Text>
            <Clock size={16} color={selectedTimeFilter ? "#111111" : "#989898"} />
            <ChevronDown size={16} color={selectedTimeFilter ? "#111111" : "#989898"} />
          </TouchableOpacity>
        </View>

        {/* Ride History */}
        <View style={styles.historyContainer}>
          {rideHistory.map((ride) => (
            <View key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <View style={styles.rideTypeHeader}>
                  {ride.type === 'received' ? (
                    <UserPlus size={20} color="#FCFCFC" />
                  ) : (
                    <Car size={20} color="#FCFCFC" />
                  )}
                  <Text style={styles.rideTypeText}>
                    {ride.type === 'received' 
                      ? 'Você recebeu carona de:' 
                      : 'Você ofereceu carona para:'
                    }
                  </Text>
                </View>

                {ride.showChatButton && (
                  <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={() => openChat(ride.id)}
                  >
                    <Text style={styles.chatButtonText}>Bate-Papo</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.rideContent}>
                {ride.type === 'received' ? (
                  <View style={styles.driverInfo}>
                    <Image source={{ uri: ride.driverAvatar }} style={styles.driverAvatar} />
                    <Text style={styles.driverName}>{ride.driverName}</Text>
                  </View>
                ) : (
                  <View style={styles.passengersInfo}>
                    <Text style={styles.passengersTitle}>
                      Tiago e outros {(ride.passengerCount || 1) - 1} integrantes
                    </Text>
                    <View style={styles.passengersAvatars}>
                      {ride.passengers?.map((passenger, index) => (
                        <Image 
                          key={index}
                          source={{ uri: passenger.avatar }} 
                          style={[
                            styles.passengerAvatar,
                            index > 0 && styles.passengerAvatarOverlap
                          ]} 
                        />
                      ))}
                    </View>
                  </View>
                )}

                <Text style={styles.locationText}>
                  <Text style={styles.boldText}>Partindo de:</Text> {ride.location}
                </Text>
              </View>

              <View style={styles.rideDetails}>
                {ride.type === 'received' && (
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>Valor pago {ride.price}</Text>
                  </View>
                )}
                <Text style={styles.durationText}>{ride.duration}</Text>
                <View style={styles.vehicleInfo}>
                  {ride.vehicleType === 'motorcycle' ? (
                    <Bike size={16} color="#111111" />
                  ) : (
                    <Car size={16} color="#111111" />
                  )}
                  <Text style={styles.vehicleText}>{ride.vehicle}</Text>
                </View>
                <View style={styles.dateTimeInfo}>
                  <Calendar size={16} color="#111111" />
                  <Text style={styles.dateTimeText}>{ride.date}</Text>
                </View>
                <View style={styles.dateTimeInfo}>
                  <Clock size={16} color="#111111" />
                  <Text style={styles.dateTimeText}>{ride.time}</Text>
                </View>
                {ride.type === 'offered' && (
                  <View style={styles.seatsInfo}>
                    <Users size={16} color="#111111" />
                    <Text style={styles.seatsText}>{ride.passengerCount}/{ride.totalSeats}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
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
  paddingBottom: 180, // Espaço para footer + tabBar
},
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FCFCFC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FCFCFC',
  },
  filterText: {
    fontSize: 16,
    color: '#989898',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#111111',
    fontWeight: '600',
  },
  filterSeparator: {
    width: 1,
    height: 20,
    backgroundColor: '#989898',
    marginHorizontal: 8,
  },
  historyContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  rideCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 20,
    marginBottom: 4,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rideTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  rideTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FCFCFC',
  },
  chatButton: {
    backgroundColor: '#FFC86A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  rideContent: {
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFC',
  },
  passengersInfo: {
    marginBottom: 12,
  },
  passengersTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFC',
    marginBottom: 8,
  },
  passengersAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#111111',
  },
  passengerAvatarOverlap: {
    marginLeft: -12,
  },
  locationText: {
    fontSize: 16,
    color: '#FCFCFC',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '700',
  },
  rideDetails: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  priceTag: {
    backgroundColor: '#FFC86A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  durationText: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '500',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vehicleText: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '500',
  },
  dateTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '500',
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatsText: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '500',
  },
});