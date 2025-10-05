// RecipeListPage.js — Étape 1
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const PAGE = '#087d74';

// Seeds (remplace par [] si tu veux partir vide)
const seedRecipes = [
  { category: 1, name: 'A0', durationHours: 0, durationMinutes: 4,  description: '...' },
  { category: 2, name: 'B1', durationHours: 1, durationMinutes: 30, description: '...' },
];

export default function RecipeListPage() {
  const [recipes] = useState(seedRecipes);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, backgroundColor: PAGE 
    },
    row: { 
        padding: 12 
    },
    name: { 
        color: 'white', fontWeight: '700' 
    },
});
