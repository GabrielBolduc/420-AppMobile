import React, { useLayoutEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';

const PAGE = '#009356ff';

// Seeds pour test
const seedRecipes = [
  { category: 1, name: 'A0', durationHours: 0, durationMinutes: 4,  description: '...' },
  { category: 2, name: 'B1', durationHours: 1, durationMinutes: 30, description: '...' },
];

function fmtDuration(h, m) {
  const mm = String(m).padStart(2, '0');
  return `${h}h${mm}`;
}

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

  const sorted = useMemo(
    () => [...recipes].sort((a, b) => a.name.localeCompare(b.name)),
    [recipes]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={(item, index) => `${item.name}-${item.durationHours}-${item.durationMinutes}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.duration}>{fmtDuration(item.durationHours, item.durationMinutes)}</Text>
            <View style={{ width: 8 }} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}><Text style={styles.emptyText}>No recipes yet...</Text></View>
        )}
        contentContainerStyle={sorted.length === 0 ? { flex: 1 } : undefined}
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
    padding: 12, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  duration: { 
    color: 'white', 
    fontWeight: '700', 
    fontSize: 12, 
    opacity: 0.9 
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
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  emptyText: { 
    color: 'white', 
    opacity: 0.85 
  },
});
