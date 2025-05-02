import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import api from '../services/api';
import {RootStackParamList} from '../../App';

type Vehicle = {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
};

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [todosOsVeiculos, setTodosOsVeiculos] = useState<Vehicle[]>([]);

  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [anoFiltro, setAnoFiltro] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles');
      setTodosOsVeiculos(response.data);
      setVehicles(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos', error);
    }
  };

  const aplicarFiltro = () => {
    const filtrados = todosOsVeiculos.filter(v => {
      return (
        (!marcaFiltro ||
          v.marca.toLowerCase().includes(marcaFiltro.toLowerCase())) &&
        (!anoFiltro || v.ano === anoFiltro)
      );
    });
    setVehicles(filtrados);
  };

  const limparFiltro = () => {
    setMarcaFiltro('');
    setAnoFiltro('');
    setVehicles(todosOsVeiculos);
  };

  const renderItem = ({item}: {item: Vehicle}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('VehicleDetail', {id: item.id})}>
      <Text style={styles.title}>
        {item.marca} - {item.modelo}
      </Text>
      <Text>{item.placa}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Veículo"
        onPress={() => navigation.navigate('AddVehicle')}
      />
      <TextInput
        placeholder="Filtrar por marca"
        value={marcaFiltro}
        onChangeText={setMarcaFiltro}
        style={styles.input}
      />
      <TextInput
        placeholder="Filtrar por ano"
        value={anoFiltro}
        onChangeText={setAnoFiltro}
        style={styles.input}
        keyboardType="numeric"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <Button title="Filtrar" onPress={aplicarFiltro} />
        <Button title="Limpar" onPress={limparFiltro} color="gray" />
      </View>

      <FlatList
        data={vehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8},
  list: {marginTop: 16},
  item: {padding: 16, borderBottomWidth: 1, borderColor: '#ccc'},
  title: {fontWeight: 'bold', fontSize: 16},
});
