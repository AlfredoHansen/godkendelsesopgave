import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [selectedGrocery, setSelectedGrocery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [apiKey] = useState('d74396421f525ad1025306262df6f1af');

  const handleSelectGrocery = (grocery) => {
    setSelectedGrocery(grocery);
  };

  const searchGroceries = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get(
          `https://api.edamam.com/api/food-database/v2/parser`,
          {
            params: {
              ingr: searchQuery,
              app_id: '64ee611b',
              app_key: apiKey,
            },
          }
        );

        console.log('API Response:', response.data);

        if (response.data.hints.length === 0) {
          setSearchResults([]);
        } else {
          const items = response.data.hints.map((hint) => {
            const food = hint.food;
            return {
              id: food.foodId,
              name: food.label,
              calories: food.nutrients.ENERC_KCAL || 0,
            };
          });
          setSearchResults(items);
        }
      } catch (error) {
        console.error('Error fetching grocery information:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a grocery"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchGroceries} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => setSelectedGrocery(item)}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />

      {selectedGrocery && (
        <View style={styles.selectedItem}>
          <Text style={styles.calorieInfo}>
            {selectedGrocery.name} - Calories: {selectedGrocery.calories}
          </Text>
          <Button
            title="Select Grocery"
            onPress={() => {
              navigation.navigate('Calories', {
                selectedGrocery: {
                  id: selectedGrocery.id,
                  name: selectedGrocery.name,
                  calories: selectedGrocery.calories,
                },
              });
            }}
          />
        </View>
      )}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    selectedItem: {
        marginTop: 16,
        padding: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    calorieInfo: {
        fontSize: 18,
    },
});

export default HomeScreen;

