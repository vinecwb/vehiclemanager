import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import api from '../services/api';
import {RootStackParamList} from '../../App';

type AddVehicleScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddVehicle'
>;

export default function AddVehicleScreen() {
  const navigation = useNavigation<AddVehicleScreenProp>();

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');

  const handleSave = async () => {
    if (!placa || !marca || !modelo || !ano || !cor) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await api.post('/vehicles', {placa, marca, modelo, ano, cor});
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar veículo', error);
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
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12},
});
