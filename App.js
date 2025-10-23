import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './context/AuthProvider'; 

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddRecipeasyPage from './pages/AddRecipeasyPage';
import RecipeFatListPage from './pages/RecipeFatListPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: '#009356ff' }}>
        <AuthProvider>
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

              <Stack.Screen
                name="RecipeList"
                component={RecipeFatListPage}
                options={{ title: 'Recipes', headerBackVisible: false }}
              />

              <Stack.Screen
                name="SignUp"
                component={SignUpPage}
                options={{ title: 'Sign up' }}
              />

              <Stack.Screen
                name="AddRecipeasy"
                component={AddRecipeasyPage}
                options={{ title: 'Recipe' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}