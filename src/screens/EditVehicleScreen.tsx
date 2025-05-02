import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import api from '../services/api';
import {RootStackParamList} from '../../App';

type EditVehicleScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditVehicle'
>;
type EditVehicleRouteProp = RouteProp<RootStackParamList, 'EditVehicle'>;

export default function EditVehicleScreen() {
  const navigation = useNavigation<EditVehicleScreenProp>();
  const route = useRoute<EditVehicleRouteProp>();
  const {id} = route.params;

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      const {placa, marca, modelo, ano, cor} = response.data;
      setPlaca(placa);
      setMarca(marca);
      setModelo(modelo);
      setAno(ano);
      setCor(cor);
    } catch (error) {
      console.error('Erro ao buscar veículo', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/vehicles/${id}`, {placa, marca, modelo, ano, cor});
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao atualizar veículo', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/vehicles/${id}`);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao excluir veículo', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
      />
      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
        style={styles.input}
      />
      <TextInput
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
        style={styles.input}
      />
      <TextInput
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        style={styles.input}
      />
      <TextInput
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
        style={styles.input}
      />
      <Button title="Atualizar" onPress={handleUpdate} />
      <Button title="Excluir" onPress={handleDelete} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12},
});
