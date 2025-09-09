import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoCircle}>
        <View style={styles.carIcon}>
          <View style={styles.carBody} />
          <View style={styles.carWindows} />
          <View style={styles.carWheels}>
            <View style={styles.wheel} />
            <View style={styles.wheel} />
          </View>
        </View>
      </View>
      <View style={styles.logoText}>
        <Text style={styles.fatecText}>FATEC</Text>
        <Text style={styles.carpoolText}>CARPOOL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFC86A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 6,
    borderColor: '#111111',
  },
  carIcon: {
    position: 'relative',
  },
  carBody: {
    width: 50,
    height: 25,
    backgroundColor: '#10b981',
    borderRadius: 12,
  },
  carWindows: {
    position: 'absolute',
    top: 3,
    left: 8,
    width: 34,
    height: 10,
    backgroundColor: '#008D60',
    borderRadius: 5,
  },
  carWheels: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  wheel: {
    width: 10,
    height: 10,
    backgroundColor: '#111111',
    borderRadius: 5,
  },
  logoText: {
    alignItems: 'center',
  },
  fatecText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FCFCFC',
    letterSpacing: 2,
  },
  carpoolText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFC86A',
    letterSpacing: 2,
    marginTop: -12,
  },
});