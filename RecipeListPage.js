import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PAGE = '#009356ff';

export default function RecipeListPage({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  // Tri par nom (ordre croissant)
  const sorted = useMemo(
    () => [...recipes].sort((a, b) => a.name.localeCompare(b.name)),
    [recipes]
  );

  // Header Log out uniquement
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recipes',
      headerBackVisible: false,
      headerRight: () => (
        <Button
          title="Log out"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        />
      ),
      headerLeft: () => null,
    });
  }, [navigation]);

  // Ouvre un detail en View
  function handleViewRandom() {
    if (sorted.length === 0) return;
    const r = sorted[Math.floor(Math.random() * sorted.length)]; // Index aleatoire entre 0 et sorted.length
    navigation.navigate('AddRecipeasy', { mode: 'view', recipe: r });
  }

  function handleAdd() {
    navigation.navigate('AddRecipeasy', {
      mode: 'add',
      onSave: (recipe) => {
        setRecipes(prev => [...prev, recipe]); // recette incerer dans la list 
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonsCol}>
          <Button title="View" onPress={handleViewRandom} disabled={sorted.length === 0} />
          <View style={{ height: 10 }} />
          <Button title="Add" onPress={handleAdd} />
        </View>
        <ScrollView style={styles.jsonBox}>
          <Text style={styles.json}>{JSON.stringify(sorted, null, 2)}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PAGE },
  content: { flex: 1, gap: 12, padding: 16 },
  buttonsCol: { alignSelf: 'stretch' },
  title: { color: 'white', fontWeight: '700', marginTop: 8 },
  jsonBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  json: {
    color: 'white',
    fontSize: 12,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
});
