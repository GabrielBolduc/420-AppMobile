// App.js
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AddRecipeasyPage from './AddRecipeasyPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* View wrapper si tu veux forcer un fond derrière les headers */}
      <View style={{ flex: 1, backgroundColor: '#009356ff' }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { backgroundColor: 'seagreen' },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ title: 'Login' }}
            />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            <Stack.Screen name="AddRecipeasy" component={AddRecipeasyPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}
