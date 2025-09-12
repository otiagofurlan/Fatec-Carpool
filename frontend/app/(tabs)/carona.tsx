import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Star, Car, Calendar, Clock, Users } from 'lucide-react-native';

interface RideRequest {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  location: string;
  status: 'confirmed' | 'pending';
}

export default function CaronaScreen() {
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: 'tiago-1',
      userName: 'Tiago Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.4,
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      status: 'confirmed'
    },
    {
      id: 'tiago-2',
      userName: 'Tiago Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.4,
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      status: 'pending'
    },
    {
      id: 'tiago-3',
      userName: 'Tiago Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.4,
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      status: 'pending'
    },
    {
      id: 'tiago-4',
      userName: 'Tiago Furlan',
      userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.4,
      location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
      status: 'pending'
    }
  ]);

  const openChat = (userId: string) => {
    router.push(`/chat/${userId}`);
  };

  const acceptRequest = (requestId: string) => {
    setRideRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'confirmed' }
          : request
      )
    );
  };

  const startRide = () => {
    // Logic to start the ride
    console.log('Starting ride...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Solicitações de Carona</Text>
        </View>

        {/* Current Ride Card */}
        <View style={styles.currentRideCard}>
          <View style={styles.currentRideHeader}>
            <Text style={styles.currentRideText}>
              <Text style={styles.boldText}>Partindo de:</Text> Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003
            </Text>
            <TouchableOpacity style={styles.startRideButton} onPress={startRide}>
              <Text style={styles.startRideButtonText}>Iniciar Carona</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rideDetailsCard}>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>Valor total R$50,00</Text>
            </View>
            
            <View style={styles.rideDetails}>
              <View style={styles.rideDetailItem}>
                <Car size={16} color="#111111" />
                <Text style={styles.rideDetailText}>Onix Branco</Text>
              </View>
              <View style={styles.rideDetailItem}>
                <Calendar size={16} color="#111111" />
                <Text style={styles.rideDetailText}>15/07</Text>
              </View>
              <View style={styles.rideDetailItem}>
                <Clock size={16} color="#111111" />
                <Text style={styles.rideDetailText}>18:15</Text>
              </View>
              <View style={styles.rideDetailItem}>
                <Users size={16} color="#111111" />
                <Text style={styles.rideDetailText}>2/4</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Confirmed Passenger */}
        {rideRequests.filter(req => req.status === 'confirmed').map((request) => (
          <View key={request.id} style={styles.confirmedCard}>
            <View style={styles.confirmedHeader}>
              <Text style={styles.confirmedText}>Caroneiro confirmado.</Text>
            </View>
            
            <View style={styles.passengerCard}>
              <Image source={{ uri: request.userAvatar }} style={styles.passengerAvatar} />
              <View style={styles.passengerInfo}>
                <Text style={styles.passengerName}>{request.userName}</Text>
                <Text style={styles.passengerLocation}>
                  <Text style={styles.boldText}>Partindo de:</Text> {request.location}
                </Text>
              </View>
              <View style={styles.passengerActions}>
                <View style={styles.ratingBadge}>
                  <Star size={14} color="#FFC86A" fill="#FFC86A" />
                  <Text style={styles.ratingText}>{request.rating}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.chatButton}
                  onPress={() => openChat(request.id)}
                >
                  <Text style={styles.chatButtonText}>Bate-Papo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Pending Requests */}
        {rideRequests.filter(req => req.status === 'pending').map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <Image source={{ uri: request.userAvatar }} style={styles.requestAvatar} />
            <View style={styles.requestInfo}>
              <Text style={styles.requestName}>{request.userName}</Text>
              <Text style={styles.requestLocation}>
                <Text style={styles.boldText}>Partindo de:</Text> {request.location}
              </Text>
            </View>
            <View style={styles.requestActions}>
              <View style={styles.ratingBadge}>
                <Star size={14} color="#FFC86A" fill="#FFC86A" />
                <Text style={styles.ratingText}>{request.rating}</Text>
              </View>
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={() => acceptRequest(request.id)}
              >
                <Text style={styles.acceptButtonText}>Aceitar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Footer Message */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>O respeito <Text style={styles.boldText}>sempre</Text> deve prevalecer.</Text>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FCFCFC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  currentRideCard: {
    backgroundColor: '#111111',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  currentRideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  currentRideText: {
    flex: 1,
    fontSize: 16,
    color: '#FCFCFC',
    lineHeight: 22,
    marginRight: 12,
  },
  boldText: {
    fontWeight: '700',
  },
  startRideButton: {
    backgroundColor: '#FFC86A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startRideButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  rideDetailsCard: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  priceTag: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: '#FFC86A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rideDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rideDetailText: {
    fontSize: 12,
    color: '#111111',
    fontWeight: '500',
  },
  confirmedCard: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmedHeader: {
    backgroundColor: '#FCFCFC',
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  confirmedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  passengerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  passengerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FCFCFC',
    marginBottom: 4,
  },
  passengerLocation: {
    fontSize: 14,
    color: '#FCFCFC',
    lineHeight: 18,
  },
  passengerActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
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
  requestCard: {
    backgroundColor: '#FFC86A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  requestLocation: {
    fontSize: 14,
    color: '#111111',
    lineHeight: 18,
  },
  requestActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
});