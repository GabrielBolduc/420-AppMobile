import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';

const PAGE = '#009356ff';

// Seeds pour test
const seedRecipes = [
  { category: 1, name: 'A0', durationHours: 0, durationMinutes: 4,  description: '...' },
  { category: 2, name: 'B1', durationHours: 1, durationMinutes: 30, description: '...' },
];

export default function RecipeListPage({ navigation }) {
  const [recipes] = useState(seedRecipes);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recipes',
      headerBackVisible: false,
      headerRight: () => (
        <Button title="Log out" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })} />
      ),
      headerLeft: () => null,
    });
  }, [navigation]);

  const ListEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No recipes yet...</Text>
    </View>
  );

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
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={recipes.length === 0 ? { flex: 1 } : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: PAGE 
  },
  row: { 
    padding: 12 
  },
  name: { 
    color: 'white',
    fontWeight: '700' 
  },
  sep: { 
    height: 1, 
    backgroundColor: 'rgba(255,255,255,0.25)' 
  },
  empty: { 
    flex: 1, alignItems: 'center', justifyContent: 'center' 
  },
  emptyText: { 
    color: 'white', opacity: 0.85 
  },
});
