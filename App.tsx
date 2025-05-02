import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddVehicleScreen from './src/screens/AddVehicleScreen';
import EditVehicleScreen from './src/screens/EditVehicleScreen';
import VehicleDetailScreen from './src/screens/VehicleDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  AddVehicle: undefined;
  EditVehicle: {id: number};
  VehicleDetail: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
        <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
        <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
