// App.js
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AddRecipeasyPage from './AddRecipeasyPage';
import RecipeListPage from './RecipeListPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
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

            <Stack.Screen
              name="RecipeList"
              component={RecipeListPage}
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
      </View>
    </SafeAreaProvider>
  );
}
