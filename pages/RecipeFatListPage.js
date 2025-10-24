import React, { useState, useLayoutEffect, useMemo, useRef, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View, StyleSheet, Button, Pressable, Platform, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { getAllRecipes } from '../services/recipeService.js';
import { AuthContext } from '../context/AuthProvider.js';

const PAGE = '#009356ff';

function fmtDuration(h, m) {
  const mm = String(m).padStart(2, '0');
  return `${h}h${mm}`;
}

function renderCategoryIcon(category) {
  switch (Number(category)) {
    case 1:  return <MaterialCommunityIcons name="coffee" size={22} color="#fff" />;
    case 2:  return <FontAwesome5 name="hamburger" size={22} color="#fff" />;
    case 3:  return <MaterialIcons name="dinner-dining" size={22} color="#fff" />;
    default: return <MaterialIcons name="restaurant" size={22} color="#fff" />;
  }
}

export default function RecipeListPage({ navigation, route }) {
  const { user, logOut } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastNonceRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recipes',
      headerBackVisible: false,
      headerRight: () => (<Button title="Log out" onPress={logOut} />),
      headerLeft: () => null,
    });
  }, [navigation]);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const data = await getAllRecipes();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Impossible de charger les recettes.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { loadRecipes(); }, []);

  useFocusEffect(
    React.useCallback(() => {
      const { recipe, nonce } = route?.params ?? {};
      if (recipe && nonce && nonce !== lastNonceRef.current) {
        lastNonceRef.current = nonce;
        navigation.setParams({ recipe: undefined, nonce: undefined });
        loadRecipes();
      }
    }, [route?.params])
  );

  const sorted = useMemo(() => [...recipes].sort((a, b) => (a.name || '').localeCompare(b.name || '')), [recipes]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('AddRecipeasy', { mode: 'view', recipe: item })}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
      style={({ pressed }) => [{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8 }, pressed && { backgroundColor: 'rgba(255,255,255,0.06)' }]}
    >
      <View style={{ width: 60, alignItems: 'center', gap: 2 }}>
        {renderCategoryIcon(item.category)}
        <Text style={{ color: 'white', fontSize: 11, fontWeight: '700', opacity: 0.9 }}>{fmtDuration(item.durationHours ?? item.duration_hours ?? 0, item.durationMinutes ?? item.duration_minutes ?? 0)}</Text>
      </View>
      <View style={{ flex: 1, paddingLeft: 8 }}>
        <Text style={{ color: 'white', fontWeight: '800', marginBottom: 2 }} numberOfLines={1}>{item.name}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) }} numberOfLines={1}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PAGE }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <FlatList
            data={sorted}
            keyExtractor={(item, index) => `${item.id ?? index}`}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.28)' }} />}
            ListEmptyComponent={() => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', opacity: 0.85, fontSize: 16 }}>No recipes yet...</Text>
              </View>
            )}
            contentContainerStyle={sorted.length === 0 ? { flex: 1 } : { paddingBottom: 96, paddingHorizontal: 10, paddingTop: 8 }}
          />

          <Pressable
            accessibilityLabel="Add recipe"
            onPress={() => navigation.navigate('AddRecipeasy', { mode: 'add' })}
            style={({ pressed }) => [{ position: 'absolute', right: 18, bottom: 18, width: 56, height: 56, borderRadius: 28, backgroundColor: '#fce307', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 }, pressed && { opacity: 0.9 }]}
            android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
          >
            <Text style={{ color: '#1b1b1b', fontSize: 28, lineHeight: 30, fontWeight: '800' }}>＋</Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}
