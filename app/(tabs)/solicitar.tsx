import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Car, Calendar, Clock, Star, User, Bike } from 'lucide-react-native';

interface RideOffer {
  id: string;
  driver: {
    name: string;
    avatar: string;
    rating?: number;
    isNew?: boolean;
  };
  location: string;
  price: {
    min: number;
    max: number;
  };
  duration: string;
  vehicle: {
    type: 'car' | 'motorcycle';
    model: string;
    color: string;
  };
  date: string;
  time: string;
  passengers: {
    current: number;
    max: number;
  };
}

const mockRides: RideOffer[] = [
  {
    id: '1',
    driver: {
      name: 'Tiago F.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.6,
    },
    location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
    price: { min: 12.50, max: 25.00 },
    duration: '58 minutos',
    vehicle: { type: 'car', model: 'Onix', color: 'Branco' },
    date: '15/07',
    time: '18:15',
    passengers: { current: 2, max: 4 },
  },
  {
    id: '2',
    driver: {
      name: 'Gabriel A.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isNew: true,
    },
    location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
    price: { min: 12.50, max: 25.00 },
    duration: '30 minutos',
    vehicle: { type: 'motorcycle', model: 'Twister', color: 'Preta' },
    date: '15/07',
    time: '18:15',
    passengers: { current: 0, max: 1 },
  },
  {
    id: '3',
    driver: {
      name: 'Rodrigo Y.',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.4,
    },
    location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
    price: { min: 12.50, max: 25.00 },
    duration: '15 minutos',
    vehicle: { type: 'car', model: 'Cruze', color: 'Preto' },
    date: '15/07',
    time: '18:15',
    passengers: { current: 3, max: 4 },
  },
  {
    id: '4',
    driver: {
      name: 'Beatriz H.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.9,
    },
    location: 'Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003',
    price: { min: 12.50, max: 25.00 },
    duration: '10 minutos',
    vehicle: { type: 'car', model: 'Jetta', color: 'Prata' },
    date: '15/07',
    time: '18:15',
    passengers: { current: 1, max: 4 },
  },
];

export default function SolicitarScreen() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleRequestRide = (rideId: string) => {
    console.log('Requesting ride:', rideId);
  };

  const handleFilterPress = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const renderRideCard = (ride: RideOffer) => (
    <View key={ride.id} style={styles.rideCard}>
      <View style={styles.cardHeader}>
        <View style={styles.driverRow}>
          <View style={styles.driverLeft}>
            <Image source={{ uri: ride.driver.avatar }} style={styles.avatar} />
            <View style={styles.driverInfo}>
              <View style={styles.nameRatingRow}>
                <Text style={styles.driverName}>{ride.driver.name}</Text>
                {ride.driver.rating ? (
                  <View style={styles.ratingBadge}>
                    <Star size={12} color="#FCFCFC" fill="#FCFCFC" />
                    <Text style={styles.ratingText}>{ride.driver.rating}</Text>
                  </View>
                ) : (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>Novato</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.requestButton}
            onPress={() => handleRequestRide(ride.id)}
          >
            <User size={16} color="#111111" />
            <Text style={styles.requestButtonText}>
              {ride.passengers.current}/{ride.passengers.max} Solicitar Carona
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.location}>
          <Text style={styles.locationLabel}>Partindo de: </Text>
          {ride.location}
        </Text>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>
            R${ride.price.max.toFixed(2)} - R${ride.price.min.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.detailText}>{ride.duration}</Text>
        <View style={styles.vehicleInfo}>
          {ride.vehicle.type === 'car' ? (
            <Car size={16} color="#989898" />
          ) : (
            <Bike size={16} color="#989898" />
          )}
          <Text style={styles.detailText}>{ride.vehicle.model} {ride.vehicle.color}</Text>
        </View>
        <View style={styles.dateTimeInfo}>
          <Calendar size={16} color="#989898" />
          <Text style={styles.detailText}>{ride.date}</Text>
        </View>
        <View style={styles.timeInfo}>
          <Clock size={16} color="#989898" />
          <Text style={styles.detailText}>{ride.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Solicitar Carona</Text>
        </View>

        <View style={styles.filterBar}>
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'vehicle' && styles.activeFilter]}
            onPress={() => handleFilterPress('vehicle')}
          >
            <Car size={16} color={activeFilter === 'vehicle' ? '#111111' : '#989898'} />
            <Text style={[styles.filterText, activeFilter === 'vehicle' && styles.activeFilterText]}>
              Veículo
            </Text>
          </TouchableOpacity>
          
          <View style={styles.filterSeparator} />
          
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'date' && styles.activeFilter]}
            onPress={() => handleFilterPress('date')}
          >
            <Calendar size={16} color={activeFilter === 'date' ? '#111111' : '#989898'} />
            <Text style={[styles.filterText, activeFilter === 'date' && styles.activeFilterText]}>
              Data
            </Text>
          </TouchableOpacity>
          
          <View style={styles.filterSeparator} />
          
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'time' && styles.activeFilter]}
            onPress={() => handleFilterPress('time')}
          >
            <Clock size={16} color={activeFilter === 'time' ? '#111111' : '#989898'} />
            <Text style={[styles.filterText, activeFilter === 'time' && styles.activeFilterText]}>
              Horário
            </Text>
          </TouchableOpacity>
          
          <View style={styles.filterSeparator} />
          
          <TouchableOpacity 
            style={[styles.filterButton, activeFilter === 'rating' && styles.activeFilter]}
            onPress={() => handleFilterPress('rating')}
          >
            <Star size={16} color={activeFilter === 'rating' ? '#111111' : '#989898'} />
            <Text style={[styles.filterText, activeFilter === 'rating' && styles.activeFilterText]}>
              Avaliação
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ridesContainer}>
          {mockRides.map(renderRideCard)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            O valor pode variar conforme o número de ocupantes.
          </Text>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
  },
  activeFilter: {
    backgroundColor: '#FCFCFC',
  },
  filterText: {
    fontSize: 14,
    color: '#989898',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#111111',
  },
  filterSeparator: {
    width: 1,
    backgroundColor: '#989898',
    marginVertical: 8,
  },
  ridesContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  rideCard: {
    backgroundColor: '#008D60',
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
  },
  cardHeader: {
    marginBottom: 12,
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  driverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCFCFC',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#FCFCFC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#008D60',
    fontSize: 12,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#FCFCFC',
    lineHeight: 20,
  },
  locationLabel: {
    fontWeight: '600',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC86A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  requestButtonText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '600',
  },
  rideDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    flexWrap: 'wrap',
  },
  priceBadge: {
    backgroundColor: '#FFC86A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 12,
    color: '#989898',
    fontWeight: '500',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footer: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  footerTextBold: {
    fontWeight: 'bold',
  },
});