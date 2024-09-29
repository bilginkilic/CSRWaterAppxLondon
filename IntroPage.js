import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroPage = () => {
  const navigation = useNavigation();

  const handleStartSurveyPress = () => {
   
    navigation.navigate('Task');
    showAlert2()
  };

  const showAlert2 = () => {
    Alert.alert('Info', 'You will have the survey only one time! Please answer them slowly', [{ text: 'OK' }], { cancelable: false });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the WaterApp!</Text>
      <Text style={styles.description}>
        Thank you for choosing the WaterApp. Our goal is to set a benchmark in water conservation and help you save water. This survey will provide valuable insights about your water footprint and offer personalized tips to reduce water usage in your daily life.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartSurveyPress}>
        <Text style={styles.buttonText}>Start Survey</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#9de3a7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default IntroPage;
