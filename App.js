import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import RecipeFatListPage from './pages/RecipeFatListPage.js';
import AddRecipeasyPage from './pages/AddRecipeasyPage.js';
import { AuthProvider } from './context/AuthProvider.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="RecipeList" component={RecipeFatListPage} options={{ title: 'Recipes' }} />
          <Stack.Screen name="AddRecipeasy" component={AddRecipeasyPage} options={{ title: 'Add Recipe' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
