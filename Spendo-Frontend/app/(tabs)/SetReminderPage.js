import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';

const SetReminder = () => {
  const [daysBefore, setDaysBefore] = useState('3 Days');

  const handleSaveReminder = () => {
    const message = `Frequency: ${frequency}\nDays Before Due Date: ${daysBefore}`;
    Alert.alert(
      'Reminder Set',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');z
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Reminder for Rent</Text>

      <View style={styles.insideContainer}>
        <Text style={styles.label}>Days Before Due Date:</Text>
        <Picker
          selectedValue={daysBefore}
          style={styles.picker}
          onValueChange={(itemValue) => setDaysBefore(itemValue)}
        >
          <Picker.Item label="1 Day" value="1 Day" />
          <Picker.Item label="2 Days" value="2 Days" />
          <Picker.Item label="3 Days" value="3 Days" />
          <Picker.Item label="7 Days" value="7 Days" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveReminder}>
        <Text style={styles.buttonText}>SAVE REMINDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  insideContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 45,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop:20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SetReminder;
