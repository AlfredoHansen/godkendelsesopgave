import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera'; // Importer Camera fra expo-camera
import { AirbnbRating } from 'react-native-ratings';

const RatingScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === 'granted') {
        setIsCameraReady(true);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (isCameraReady && cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    } else {
      console.error('Camera is not ready yet.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the Dish</Text>
      {isCameraReady && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
      )}
      <Button title="Take Picture" onPress={takePicture} />
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <AirbnbRating
        count={5}
        reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
        defaultRating={1}
        onFinishRating={(value) => setRating(value)}
      />
      <Button
        title="Save Rating"
        onPress={() => {
          // Gem rettens navn, bedømmelse og billede (photo) i din database eller state
          // Naviger til en anden skærm eller udfør andre handlinger
        }}
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
  camera: {
    flex: 1,
    aspectRatio: 4/3,
  },
  photo: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default RatingScreen;

