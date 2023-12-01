// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    navigation.navigate('Weather', { city });
  };

  return (
    <LinearGradient
      colors={['#87CEEB', '#3498db']}
      style={styles.container}
    >
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    color: 'white',
    fontSize: 20,
    fontWeight:'bold'
  },
});

export default HomeScreen;
