// RecipeListPage.js
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PAGE = '#009356ff';

export default function RecipeListPage({ navigation, route }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const action = route?.params?.action;
    if (action !== 'save') return;

    const r = route?.params?.recipe;
    if (!r) return;

    setRecipes(prev => {
      const i = prev.findIndex(
        x => x.name?.trim().toLowerCase() === r.name?.trim().toLowerCase()
      );
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = r;
        return copy;
      }
      return [...prev, r];
    });

    navigation.setParams({ action: undefined, recipe: undefined });
  }, [route?.params?.action, navigation]);

  const sorted = useMemo(
    () => [...recipes].sort((a, b) => a.name.localeCompare(b.name)),
    [recipes]
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recipes',
      headerBackVisible: false,
      headerLeft: () => (
        <Button
          title="Log out"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        />
      ),
    });
  }, [navigation]);

  function handleViewRandom() {
    if (sorted.length === 0) return;
    const r = sorted[Math.floor(Math.random() * sorted.length)];
    navigation.navigate('AddRecipeasy', { mode: 'view', recipe: r });
  }
  function handleAdd() {
    navigation.navigate('AddRecipeasy', { mode: 'add' });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonsCol}>
          <Button title="View (random)" onPress={handleViewRandom} disabled={sorted.length === 0} />
          <View style={{ height: 10 }} />
          <Button title="Add +" onPress={handleAdd} />
        </View>

        <Text style={styles.title}>Données (triées par nom) :</Text>

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
