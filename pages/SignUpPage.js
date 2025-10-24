import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserCredentials from '../models/UserCredentials.js';
import { AuthContext } from '../context/AuthProvider.js';

export default function SignUpPage({ navigation }) {
  const [credentials, setCredentials] = useState(new UserCredentials({ username: '', password: '' }));
  const { signUp } = useContext(AuthContext);

  async function handleCreateMyAccountPressed() {
    try {
      const success = await signUp(credentials);
      if (success) {
        navigation.reset({ index: 0, routes: [{ name: 'RecipeList' }] });
      } else {
        Alert.alert('Erreur', 'Impossible de créer le compte.');
      }
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Erreur lors de la création du compte.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          value={credentials.username}
          onChangeText={text => setCredentials(new UserCredentials({ ...credentials, username: text }))}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          secureTextEntry
          value={credentials.password}
          onChangeText={text => setCredentials(new UserCredentials({ ...credentials, password: text }))}
        />

        <TextInput
          placeholder="Password confirmation"
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleCreateMyAccountPressed}>
          <Text style={styles.btnText}>Create my account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PAGE = '#009356ff';
const LOGIN = '#fce307ff';

const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    backgroundColor: PAGE, 
    paddingHorizontal: 24, 
    justifyContent: 'center' 
  },
  form: 
  { 
    alignItems: 'center' 
  },
  input: { width: '100%', height: 56, borderWidth: 2, borderColor: 'white', borderRadius: 4, paddingHorizontal: 16, marginBottom: 18, color: 'white', fontSize: 16, backgroundColor: 'transparent' },
  btn: { marginTop: 12, backgroundColor: LOGIN, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, minWidth: 120, alignItems: 'center' },
  btnText: { color: '#1b1b1b', fontWeight: '700', fontSize: 16 },
});
