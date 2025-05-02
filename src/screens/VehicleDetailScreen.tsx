import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import api from '../services/api';
import {RootStackParamList} from '../../App';

type VehicleDetailScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'VehicleDetail'
>;
type VehicleDetailRouteProp = RouteProp<RootStackParamList, 'VehicleDetail'>;

type Vehicle = {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
};

export default function VehicleDetailScreen() {
  const navigation = useNavigation<VehicleDetailScreenProp>();
  const route = useRoute<VehicleDetailRouteProp>();
  const {id} = route.params;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      setVehicle(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículo', error);
    }
  };

  if (!vehicle) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {vehicle.marca} {vehicle.modelo}
      </Text>
      <Text>Placa: {vehicle.placa}</Text>
      <Text>Ano: {vehicle.ano}</Text>
      <Text>Cor: {vehicle.cor}</Text>
      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditVehicle', {id: vehicle.id})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 8},
});
