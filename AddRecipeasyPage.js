import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';

export default function AddRecipeasyPage({ navigation, route }) {
  const [mealType, setMealType] = React.useState(null); 
  const [name, setName] = React.useState('');
  const [hours, setHours] = React.useState('0'); 
  const [minutes, setMinutes] = React.useState('0');
  const [description, setDescription] = React.useState('');

  const mode   = route?.params?.mode ?? 'add';        // 'add' | 'view'
  const onSave = route?.params?.onSave;               // callback reçu de la liste

  // Préremplir en view, vider en add
  React.useEffect(() => {
    const r = route?.params?.recipe;
    if (mode === 'view' && r) {
      setMealType(r.category != null ? String(r.category) : null);
      setName(r.name ?? '');
      setHours(String(r.durationHours ?? 0));
      setMinutes(String(r.durationMinutes ?? 0));
      setDescription(r.description ?? '');
    }
    if (mode === 'add') {
      setMealType(null); setName(''); setHours('0'); setMinutes('0'); setDescription('');
    }
  }, [mode, route?.params?.recipe]);

  const radioOptions = [
    { id: '1', label: 'Breakfast', value: 'breakfast', borderColor: WHITE },
    { id: '2', label: 'Lunch',     value: 'lunch',     borderColor: 'rgba(255,255,255,0.9)' },
    { id: '3', label: 'Dinner',    value: 'dinner',    borderColor: 'rgba(255,255,255,0.9)' },
  ];

  const handleMealType = (arg) => {
    if (Array.isArray(arg)) {
      const sel = arg.find(b => b.selected);
      setMealType(sel ? sel.id : null);
    } else {
      setMealType(arg);
    }
  };

  // Validation en creation uniquement
  function validate() {
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    const errs = [];
    if (!mealType) errs.push('Catégorie requise.');
    if (!name.trim()) errs.push('Nom requis, non vide.');
    if (!(h >= 0 && h <= 12)) errs.push('Heures doit être entre 0 et 12.');
    if (!(m >= 0 && m <= 59)) errs.push('Minutes doit être entre 0 et 59.');
    if ((h * 60 + m) <= 0) errs.push('La durée totale doit être > 0.');
    if (errs.length) { Alert.alert('Validation', errs.join('\n')); return false; }
    return true;
  }

  function handleSave() {
    if (mode !== 'add') return;
    if (!validate()) return;

    const recipe = {
      category: mealType ? parseInt(mealType, 10) : null,
      name: name.trim(),
      durationHours: parseInt(hours, 10) || 0,
      durationMinutes: parseInt(minutes, 10) || 0,
      description: description.trim(),
    };

    // Appelle le callback de la liste puis revient à la liste existante
    if (typeof onSave === 'function') {
      onSave(recipe);
    }
    navigation.goBack();
  }
  
  function handleDelete() {
    if (mode !== 'view') return;
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <RadioGroup
        radioButtons={radioOptions}
        selectedId={mealType}
        onPress={handleMealType}
        layout="row"
        labelStyle={styles.radioLabel}
      />

      <TextInput
        style={[styles.input, styles.inputWhite]}
        placeholder="Name"
        placeholderTextColor="rgba(255,255,255,0.85)"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.durationRow}>
        <Text style={styles.label}>Duration</Text>

        <Picker
          selectedValue={hours}
          onValueChange={setHours}
          style={[styles.picker, styles.inputWhite]}
          dropdownIconColor="#fff"
        >
          {[...Array(13).keys()].map(h => (
            <Picker.Item key={h} label={`${h} h`} value={String(h)} />
          ))}
        </Picker>

        <Text style={styles.colon}> : </Text>

        <Picker
          selectedValue={minutes}
          onValueChange={setMinutes}
          style={[styles.picker, styles.inputWhite]}
          dropdownIconColor="#fff"
        >
          {[0, 15, 30, 45].map(m => (
            <Picker.Item key={m} label={`${m} mins`} value={String(m)} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.inputWhite, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="rgba(255,255,255,0.85)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={{ marginTop: 20 }}>
        {mode === 'add'
          ? <Button title="Save" color="#fce307ff" onPress={handleSave} />
          : <Button title="Delete" color="#fce307ff" onPress={handleDelete} />
        }
      </View>
    </SafeAreaView>
  );
}
const PAGE = '#009356ff';
const WHITE = 'rgba(255,255,255,0.9)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE,
    padding: 17,
  },
  label: {
    color: WHITE,
    fontWeight: '700',
    marginRight: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 12,
    minHeight: 50,
    color: 'white',
    marginVertical: 18,
  },
  inputWhite: {
    borderColor: WHITE,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  picker: {
    flex: 1,
    height: 50,
    color: WHITE,
    borderRadius: 4,
  },
  colon: {
    color: WHITE,
    fontSize: 18,
    marginHorizontal: 8,
    fontWeight: '700',
  },
  textArea: {
    minHeight: 300,
    textAlignVertical: 'top',
  },
  radioLabel: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
});