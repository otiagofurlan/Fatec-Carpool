import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, LogOut, Car, Calendar, Clock, Users } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Boa noite, <Text style={styles.userName}>Tiago!</Text></Text>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.locationButton}>
              <MapPin size={20} color="#989898" />
            </TouchableOpacity>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Rating Card */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingLabel}>Sua avaliação:</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingValue}>4,6</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={[styles.star, star <= 4 ? styles.starFilled : styles.starEmpty]}>
                  ★
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Estatísticas</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Caronas como Motorista</Text>
            <Text style={styles.statValue}>30</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Caronas como Passageiro</Text>
            <Text style={styles.statValue}>40</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Dinheiro Economizado</Text>
            <Text style={styles.statValue}>R$388,47</Text>
          </View>
        </View>

        {/* Active Ride Card */}
        <View style={styles.activeRideCard}>
          <Text style={styles.activeRideTitle}>Você está oferecendo uma carona.</Text>
          <Text style={styles.activeRideSubtitle}>
            <Text style={styles.boldText}>Partindo de:</Text> Praça Duque De Caxias - Centro, Itapetininga - SP, 18200-003
          </Text>
          
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
            <TouchableOpacity style={styles.viewPassengersButton}>
              <Text style={styles.viewPassengersText}>Ver passageiros 2/4</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image 
          source={require("../../assets/images/cpscarreiras.webp")} 
          style={styles.cardIndex}
        />

        <Image 
          source={require("../../assets/images/admob.webp")} 
          style={styles.cardIndex}
        />

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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 4,
  },
  userName: {
    fontWeight: '700',
  },
  logoutButton: {
    alignSelf: 'flex-start',
  },
  logoutText: {
    fontSize: 16,
    color: '#989898',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationButton: {
    padding: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00000030',
  },
  ratingLabel: {
    fontSize: 18,
    color: '111111',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: '400',
    color: '#111111',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 20,
  },
  starFilled: {
    color: '#FFC86A',
  },
  starEmpty: {
    color: '#989898',
  },
  statsCard: {
    backgroundColor: '#FFC86A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#111111',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  activeRideCard: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  activeRideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FCFCFC',
    marginBottom: 12,
  },
  activeRideSubtitle: {
    fontSize: 14,
    color: '#FCFCFC',
    marginBottom: 16,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
  },
  rideDetails: {
    backgroundColor: '#FCFCFC',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  rideDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rideDetailText: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '500',
  },
  viewPassengersButton: {
    backgroundColor: '#FFC86A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  viewPassengersText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  promoCard: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#989898',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardIndex: {
  width: "100%",
  height: 100,
  borderRadius: 12,
  resizeMode: "cover",
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#11111130",
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#989898',
  },
  promoGraphic: {
    width: 80,
    height: 60,
    position: 'relative',
  },
  networkPattern: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111111',
    borderRadius: 8,
    opacity: 0.1,
  },
  adContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#FCFCFC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFC86A',
  },
  adTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFC',
  },
  adSubtitle: {
    fontSize: 12,
    color: '#FCFCFC',
    opacity: 0.8,
  },
  adImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
});