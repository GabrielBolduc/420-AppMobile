import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpPage({ navigation }) {
  function handleCreateMyAccountPressed() {
    navigation.navigate('AddRecipeasy')
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            secureTextEntry
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
    </SafeAreaProvider>
  )
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