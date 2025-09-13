import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Animated } from 'react-native';

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

// Estilos para o footer
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 120, // Posicionado exatamente acima da barra preta
    left: 0,
    right: 0,
    zIndex: 10,
  },
  footer: {
    paddingVertical: 10,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    minHeight: 40,
    justifyContent: 'center',
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
  cursor: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
});

// Array de mensagens para rotacionar
const messages = [
  "O valor pode variar conforme o número de ocupantes.",
  "O Fatec Carpool não tem fins lucrativos.",
  "O respeito sempre deve prevalecer."
];

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

// Componente para o efeito de digitação
function TypewriterText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorOpacity] = useState(new Animated.Value(1));

  // Animação do cursor piscando
  useEffect(() => {
    const cursorAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    cursorAnimation.start();

    return () => cursorAnimation.stop();
  }, []);

  // Efeito de digitação
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  // Resetar quando o texto mudar
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.footerText}>
        {displayedText}
      </Text>
      <Animated.Text style={[styles.cursor, { opacity: cursorOpacity }]}>
        {currentIndex < text.length ? '|' : ''}
      </Animated.Text>
    </View>
  );
}

export default function TabLayout() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Configurar o intervalo para mudar a mensagem a cada 10 segundos
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % messages.length
      );
    }, 10000); // 10 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Componente de Tabs com wrapper para conteúdo */}
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
            position: 'absolute',
            bottom: 0, // Barra preta colada no final da página
            left: 0,
            right: 0,
            zIndex: 1000,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#FFFFFF',
          // Adicionar padding bottom para o conteúdo das telas
          tabBarItemStyle: {
            paddingBottom: 0,
          },
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

      {/* Footer grudado acima da barra preta */}
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <TypewriterText 
            text={messages[currentMessageIndex]} 
            speed={30} // Velocidade da digitação (ms por caractere)
          />
        </View>
      </View>
    </View>
  );
}