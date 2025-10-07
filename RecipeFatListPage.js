import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View, StyleSheet, Button, Pressable, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PAGE = '#009356ff';


const seedRecipes = [
  { category: 1, name: 'A0', durationHours: 0, durationMinutes: 4,  description: 'description1' },
  { category: 2, name: 'B1', durationHours: 1, durationMinutes: 30, description: 'description2' },
  { category: 3, name: 'C1', durationHours: 1, durationMinutes: 10, description: 'description3' },
  { category: 2, name: 'B2', durationHours: 3, durationMinutes: 30, description: 'description4' },
];

function fmtDuration(h, m) {
  const mm = String(m).padStart(2, '0');
  return `${h}h${mm}`;
}

function renderCategoryIcon(category) {
  switch (category) {
    case 1:  return <MaterialCommunityIcons name="coffee" size={22} color="#fff" />;
    case 2:  return <FontAwesome5 name="hamburger" size={22} color="#fff" />;
    case 3:  return <MaterialIcons name="dinner-dining" size={22} color="#fff" />;
    default: return <MaterialIcons name="restaurant" size={22} color="#fff" />;
  }
}

export default function RecipeListPage({ navigation, route }) {
  const [recipes, setRecipes] = useState(seedRecipes);
  const lastNonceRef = useRef(null);

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

  useFocusEffect(
    React.useCallback(() => {
      const { recipe, nonce } = route?.params ?? {};
      if (recipe && nonce && nonce !== lastNonceRef.current) {
        setRecipes(prev => [...prev, recipe]);       // ajout
        lastNonceRef.current = nonce;                // evite doublon
        navigation.setParams({ recipe: undefined, nonce: undefined }); // nettoie
      }
    }, [route?.params, navigation])
  );

  const sorted = useMemo(
    () => [...recipes].sort((a, b) => a.name.localeCompare(b.name)),
    [recipes]
  );

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('AddRecipeasy', { mode: 'view', recipe: item })}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: 'rgba(255,255,255,0.06)' }]}
    >
      <View style={styles.leftCol}>
        {renderCategoryIcon(item.category)}
        <Text style={styles.duration}>{fmtDuration(item.durationHours, item.durationMinutes)}</Text>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={(item, index) => `${item.name}-${item.durationHours}-${item.durationMinutes}-${index}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}><Text style={styles.emptyText}>No recipes yet...</Text></View>
        )}
        contentContainerStyle={sorted.length === 0 ? { flex: 1 } : styles.listContent}
      />

      <Pressable
        accessibilityLabel="Add recipe"
        onPress={() => navigation.navigate('AddRecipeasy', { mode: 'add' })}
        style={({ pressed }) => [styles.fab, pressed && { opacity: 0.9 }]}
        android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
      >
        <Text style={styles.fabPlus}>＋</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, backgroundColor: PAGE 
  },
  listContent: { 
    paddingBottom: 96, 
    paddingHorizontal: 10, 
    paddingTop: 8 
  },

  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 8, 
    borderRadius: 8 
  },
  leftCol: { 
    width: 60, 
    alignItems: 'center', 
    gap: 2 
  },
  duration: { 
    color: 'white', 
    fontSize: 11, 
    fontWeight: '700', 
    opacity: 0.9 
  },

  rightCol: { 
    flex: 1, 
    paddingLeft: 8 
  },
  name: { 
    color: 'white', 
    fontWeight: '800', 
    marginBottom: 2 
  },
  desc: { 
    color: 'rgba(255,255,255,0.85)', 
    fontSize: 12, 
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) 
  },

  sep: { 
    height: 1, 
    backgroundColor: 'rgba(255,255,255,0.28)', 
    marginHorizontal: 0 
  },

  empty: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  emptyText: { 
    color: 'white', 
    opacity: 0.85, 
    fontSize: 16 
  },

  fab: {
    position: 'absolute', right: 18, bottom: 18,
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#fce307',
    alignItems: 'center', justifyContent: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
  },
  fabPlus: { color: '#1b1b1b', fontSize: 28, lineHeight: 30, fontWeight: '800' },
});
