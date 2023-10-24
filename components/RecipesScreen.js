import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios'; // Importer axios
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecipesScreen">
        <Stack.Screen name="RecipesScreen" component={RecipesScreen} />
        <Stack.Screen name="CaloriesScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const RecipesScreen = ({ navigation }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [apiKey] = useState('336fdf2cd387dcdb1d18d0670207dc0d'); 
  
  const [showRecipe, setShowRecipe] = useState(false); // Ny tilstand for at vise opskriften
  
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipe(true); // Vis opskriften, når der vælges en opskrift
  };
  
  const searchRecipes = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get(
          "https://api.edamam.com/api/recipes/v2",
          {
            params: {
              q: searchQuery,
              app_id: 'cb16f442',
              app_key: apiKey,
            },
          }
        );
  
        const recipes = response.data.hits.map((hit) => {
          return {
            label: hit.recipe.label,
            calories: hit.recipe.calories,
            ingredients: hit.recipe.ingredientLines,
          };
        });
  
        setSearchResults(recipes);
  
        if (recipes.length === 0) {
          setShowRecipe(false); // Skjul opskriften, hvis ingen resultater findes
        }
      } catch (error) {
        console.error('Error fetching recipe information:', error);
        setShowRecipe(false); // Skjul opskriften ved fejl
      }
    } else {
      setSearchResults([]);
      setShowRecipe(false); // Skjul opskriften ved tom søgning
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a recipe"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchRecipes} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Button
            title={item.label}
            onPress={() => handleSelectRecipe(item)}
          />
        )}
        keyExtractor={(item, index) => `${item.label}-${index}`}
      />
  
      {showRecipe && selectedRecipe && (
        <View style={styles.selectedItem}>
          <Text style={styles.recipeInfo}>
            {selectedRecipe.label}
          </Text>
          <Button
            title="View Recipe"
            onPress={() => {
              // Vis opskriftsoplysningerne her i samme komponent
              console.log(selectedRecipe); // Udskriv opskriftsoplysningerne i konsollen
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
  recipeInfo: {
    fontSize: 18,
  },
});

export default RecipesScreen;
