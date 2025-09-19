import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';

export default function Page3() {
  const [mealType, setMealType] = React.useState(null); 
  const [name, setName] = React.useState('');
  const [hours, setHours] = React.useState('0');
  const [minutes, setMinutes] = React.useState('0');
  const [description, setDescription] = React.useState('');

  const radioOptions = [
    { id: '1', label: 'Breakfast', value: 'breakfast', borderColor: WHITE },
    { id: '2', label: 'Lunch',     value: 'lunch', borderColor: 'rrgba(255,255,255,0.9)' },
    { id: '3', label: 'Dinner',    value: 'dinner', borderColor: 'rgba(255,255,255,0.9)' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <RadioGroup
        radioButtons={radioOptions}
        selectedId={mealType} 
        onPress={setMealType}
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
          <Picker.Item label="0 h" value="0" />
          <Picker.Item label="1 h" value="1" />
          <Picker.Item label="2 h" value="2" />
          <Picker.Item label="3 h" value="3" />
        </Picker>

        <Text style={styles.colon}> : </Text>

        <Picker
          selectedValue={minutes}
          onValueChange={setMinutes}
          style={[styles.picker, styles.inputWhite]}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="0 mins" value="0" />
          <Picker.Item label="15 mins" value="15" />
          <Picker.Item label="30 mins" value="30" />
          <Picker.Item label="45 mins" value="45" />
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
        <Button title="Save" color = "#fce307ff"/>
      </View>
    </SafeAreaView>
  );
}

const PAGE = '#009356ff'; 
const WHITE ='rgba(255,255,255,0.9)';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: PAGE, 
    padding: 18 
  },
  label: { 
    color: WHITE, 
    fontWeight: '700', 
    marginRight: 10 
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
    borderColor: WHITE 
  },
  durationRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 18 
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
    fontWeight: '700' 
  },
  textArea: { 
    minHeight: 400, 
    textAlignVertical: 'top' 
  },

  radioLabel: {
    color: WHITE, 
    fontSize: 16, 
    fontWeight: '500'
  },

});
