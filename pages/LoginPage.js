import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthProvider'; 

export default function LoginPage({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleLogin() {
    if (!username.trim() || !password) {
      Alert.alert('Erreur', 'Veuillez fournir username et password.');
      return;
    }
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'RecipeList' }],
      });
    } catch (err) {
      Alert.alert('Login failed', err.message || 'Impossible de se connecter.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#1b1b1b" /> : <Text style={styles.btnText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkWrap} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Sign up!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PAGE = '#009356ff';
const LOGIN = '#fce307ff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 18,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  btn: {
    marginTop: 12,
    backgroundColor: LOGIN,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  btnText: {
    color: '#1b1b1b',
    fontWeight: '700',
    fontSize: 16,
  },
  linkWrap: {
    marginTop: 36,
  },
  link: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '600',
  },
});
