import React from 'react';
import { Button, View, Text, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider, useAppContext } from './AppContext';

function Inicio({ navigation }) {
  const { dado1, dado2, resultado, lancarDados } = useAppContext();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Dado 1: {dado1 !== null ? dado1 : 'Lance os dados'}</Text>
    <Text>Dado 2: {dado2 !== null ? dado2 : 'Lance os dados'}</Text>
    <Text>Resultado: {resultado !== null ? resultado : 'Lance os dados'}</Text>
    <View style={{ marginVertical: 10 }} />

    <Button title="Lançar Dados" onPress={lancarDados} />
    <View style={{ marginVertical: 10 }} />
    <Button title="Histórico" onPress={() => navigation.navigate('Historico')} />
  </View>
  
  );
}

function Historico() {
  const { historico } = useAppContext();

  const formattedData = [
    {
      title: 'Vitórias',
      data: historico.vitorias.map((round) => ({
        key: `${round.dado1}-${round.dado2}`,
        ...round,
      })),
    },
    {
      title: 'Derrotas',
      data: historico.derrotas.map((round) => ({
        key: `${round.dado1}-${round.dado2}`,
        ...round,
      })),
    },
  ];

  return (
    <SectionList
      style={{ flex: 1 }}
      sections={formattedData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Text>
          Dado 1: {item.dado1} | Dado 2: {item.dado2} | Soma: {item.soma}
        </Text>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      )}
    />
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Historico" component={Historico} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
