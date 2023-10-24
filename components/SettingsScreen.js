import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = ({ route }) => {
  const { selectedGrocery } = route.params;

  const totalCalories = selectedGrocery ? selectedGrocery.calories : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Grocery</Text>
      {selectedGrocery ? (
        <View style={styles.selectedGrocery}>
          <Text style={styles.groceryName}>{selectedGrocery.name}</Text>
          <Text style={styles.calories}>
            Calories: {selectedGrocery.calories}
          </Text>
        </View>
      ) : (
        <Text style={styles.noGrocery}>No grocery selected</Text>
      )}
      <Text style={styles.totalCalories}>
        Total Calories: {totalCalories}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedGrocery: {
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  groceryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 16,
  },
  totalCalories: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default SettingsScreen;

