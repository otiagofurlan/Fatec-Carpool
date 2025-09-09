import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

// Importando SVGs como componentes
import InicioIcon from '../../assets/images/inicio.svg';
import SolicitarIcon from '../../assets/images/solicitar.svg';
import OferecerIcon from '../../assets/images/oferecer.svg';
import CaronaIcon from '../../assets/images/carona.svg';
import HistoricoIcon from '../../assets/images/historico.svg';

// Tipagem para o TabIcon
interface TabIconProps {
  focused: boolean;
  Icon: React.FC<{ width?: number; height?: number; fill?: string }>;
  title: string;
}

function TabIcon({ focused, Icon, title }: TabIconProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', minWidth: 100 }}>
      <View
        style={{
          backgroundColor: focused ? '#FFFFFF' : '#000',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 50,
        }}
      >
        <View style={{ marginBottom: 4 }}>
          <Icon width={24} height={24} fill={focused ? '#000000' : '#FFFFFF'} />
        </View>
        <Text
          style={{
            fontSize: 11,
            fontWeight: '500',
            color: focused ? '#000000' : '#FFFFFF',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 120,
          paddingBottom: 20,
          paddingTop: 30,
          paddingHorizontal: 8,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={InicioIcon} title="Início" />,
        }}
      />
      <Tabs.Screen
        name="solicitar"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={SolicitarIcon} title="Solicitar" />,
        }}
      />
      <Tabs.Screen
        name="oferecer"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={OferecerIcon} title="Oferecer" />,
        }}
      />
      <Tabs.Screen
        name="carona"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={CaronaIcon} title="Carona" />,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={HistoricoIcon} title="Histórico" />,
        }}
      />
    </Tabs>
  );
}
