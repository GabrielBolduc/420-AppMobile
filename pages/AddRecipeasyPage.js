import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';
import { addRecipe, updateRecipe, deleteRecipe } from '../services/recipeService.js';
import { AuthContext } from '../context/AuthProvider.js';

const PAGE = '#009356ff';
const WHITE = 'rgba(255,255,255,0.9)';

export default function AddRecipeasyPage({ navigation, route }) {
  const { user } = React.useContext(AuthContext);
  const [mealType, setMealType] = React.useState(null);
  const [name, setName] = React.useState('');
  const [hours, setHours] = React.useState('0');
  const [minutes, setMinutes] = React.useState('0');
  const [description, setDescription] = React.useState('');

  const mode = route?.params?.mode ?? 'add';
  const currentRecipe = route?.params?.recipe;

  React.useEffect(() => {
    if ((mode === 'view' || mode === 'edit') && currentRecipe) {
      setMealType(currentRecipe.category ? String(currentRecipe.category) : null);
      setName(currentRecipe.name ?? '');
      setHours(String(currentRecipe.durationHours ?? currentRecipe.duration_hours ?? 0));
      setMinutes(String(currentRecipe.durationMinutes ?? currentRecipe.duration_minutes ?? 0));
      setDescription(currentRecipe.description ?? '');
    }
    if (mode === 'add') {
      setMealType(null); setName(''); setHours('0'); setMinutes('0'); setDescription('');
    }
  }, [mode, currentRecipe]);

  async function handleSave() {
    const recipe = {
      id: currentRecipe?.id,
      category: mealType ? parseInt(mealType, 10) : null,
      name: name.trim(),
      durationHours: parseInt(hours, 10) || 0,
      durationMinutes: parseInt(minutes, 10) || 0,
      description: description.trim(),
      user_id: user?.id,
    };

    try {
      if (mode === 'add') await addRecipe(recipe);
      else if (mode === 'edit') await updateRecipe(recipe);

      navigation.navigate({
        name: 'RecipeList',
        params: { recipe, nonce: Date.now() },
        merge: true,
      });
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Impossible de sauvegarder la recette.');
    }
  }

  async function handleDelete() {
    if (!currentRecipe?.id) return;
    try {
      await deleteRecipe(currentRecipe.id, user?.id);
      navigation.navigate({ name: 'RecipeList', params: { nonce: Date.now() }, merge: true });
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Impossible de supprimer la recette.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PAGE, padding: 16 }}>
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={mealType}
        style={styles.input}
        onValueChange={val => setMealType(val)}
      >
        <Picker.Item label="Select category" value={null} />
        <Picker.Item label="Coffee" value="1" />
        <Picker.Item label="Hamburger" value="2" />
        <Picker.Item label="Dinner" value="3" />
      </Picker>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={WHITE} />

      <Text style={styles.label}>Duration Hours</Text>
      <TextInput style={styles.input} value={hours} onChangeText={setHours} keyboardType="numeric" placeholder="Hours" placeholderTextColor={WHITE} />

      <Text style={styles.label}>Duration Minutes</Text>
      <TextInput style={styles.input} value={minutes} onChangeText={setMinutes} keyboardType="numeric" placeholder="Minutes" placeholderTextColor={WHITE} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={WHITE}
        multiline
      />

      <Button title={mode === 'view' ? 'Edit' : 'Save'} color="#fce307ff" onPress={() => {
        if (mode === 'view') navigation.setParams({ mode: 'edit' });
        else handleSave();
      }} />

      {mode !== 'add' && (
        <View style={{ marginTop: 10 }}>
          <Button title="Delete" color="#ff3333" onPress={handleDelete} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: { color: 'white', fontWeight: '600', marginTop: 12 },
  input: { backgroundColor: 'transparent', color: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 4, padding: 10, marginTop: 6 },
});
