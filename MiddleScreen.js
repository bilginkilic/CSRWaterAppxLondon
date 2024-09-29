import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const MiddleScreen = ({ navigation, route }) => {
  const taskQuestion = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('SubSurvey', taskQuestion);
  };

  const handleOpenLink = () => {
    const url = taskQuestion.content.video; // Replace with your actual URL
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{taskQuestion.trainingText}</Text>
        <Text style={styles.infoText}>{taskQuestion.content.additionalInfo}</Text>
        <TouchableOpacity onPress={handleOpenLink} style={styles.linkButton}>
        
          <Text >{taskQuestion.content.image}</Text>
          <Text style={styles.linkText}>Learn more</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.buttonText}>Give me time</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.buttonText}>Continue to pledge the task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  infoBox: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#0645AD', // A color that is commonly used for links
    textDecorationLine: 'underline',
  },
  goBackButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    padding: 10,
    backgroundColor: '#87CEEB',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MiddleScreen;
