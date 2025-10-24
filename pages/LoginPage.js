import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserCredentials from '../models/UserCredentials.js';
import { AuthContext } from '../context/AuthProvider.js';

export default function LoginPage({ navigation }) {
  const [credentials, setCredentials] = useState(new UserCredentials({ username: '', password: '' }));
  const { logIn } = useContext(AuthContext);

  async function handleLogin() {
    try {
      const success = await logIn(credentials);
      if (success) {
        navigation.reset({ index: 0, routes: [{ name: 'RecipeList' }] });
      } else {
        Alert.alert('Erreur', 'Identifiants invalides.');
      }
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Impossible de se connecter.');
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={[styles.input, styles.inputWhite]}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.8)"
        value={credentials.username}
        onChangeText={text => setCredentials(new UserCredentials({ ...credentials, username: text }))}
      />

      <TextInput
        style={[styles.input, styles.inputWhite]}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.8)"
        secureTextEntry
        value={credentials.password}
        onChangeText={text => setCredentials(new UserCredentials({ ...credentials, password: text }))}
      />

      <View style={{ marginTop: 25, width: '100%' }}>
        <Button title="Login" color="#fce307ff" onPress={handleLogin} />
      </View>

      <View style={{ marginTop: 15, width: '100%' }}>
        <Button title="Sign Up" color="#fce307ff" onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  );
}

const PAGE = '#009356ff';
const WHITE = 'rgba(255,255,255,0.9)';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PAGE, alignItems: 'center', justifyContent: 'center', padding: 24 },
  input: { borderWidth: 2, borderRadius: 4, paddingHorizontal: 12, height: 50, color: 'white', marginVertical: 10, width: '100%' },
  inputWhite: { borderColor: WHITE },
});
