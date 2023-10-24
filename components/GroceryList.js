import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const GroceryList = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const addGroceryItem = () => {
    if (groceryItem.trim() !== '') {
      setGroceryList([...groceryList, groceryItem]);
      setGroceryItem('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a grocery item"
        value={groceryItem}
        onChangeText={(text) => setGroceryItem(text)}
      />
      <Button title="Add" onPress={addGroceryItem} />
      <FlatList
        data={groceryList}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  listItem: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default GroceryList;
