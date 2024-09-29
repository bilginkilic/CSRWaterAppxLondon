import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image, Animated, AsyncStorage } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { GlobalContext } from './GlobalContext';
import questionsw from './questionsData';
import { Statisticx, Todo } from './src/models';
import { DataStore, Predicates } from "@aws-amplify/datastore";

const Wizard = () => {
  const { takeTest } = useContext(AuthContext);
  const [questionIndex, setQuestionIndex] = useLocalStorage('questionIndex', 0);
  const { answers, setAnswers } = useContext(GlobalContext);
  const [savingValue, setSavingValue] = useLocalStorage('savingValue', 0);
  const [totalValue, setTotalValue] = useLocalStorage('totalValue', 0);
  const [username, setUsername] = useLocalStorage('username', '');
  const progress = useRef(new Animated.Value(0)).current;
  const [hasSurvey, setHasSurvey] = useLocalStorage('hasSurvey', false);
 
  useEffect(() => {
    const loadData = async () => {
      try {
        const answersJson = await AsyncStorage.getItem('answers');
        if (answersJson) {
          const storedAnswers = JSON.parse(answersJson);
          setAnswers(storedAnswers);
          setQuestionIndex(storedAnswers.length);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const handleSelectOption = (question, opt) => {
    setAnswers([
      ...answers,
      {
        questionid: question.id,
        question: question.text,
        answer: opt.text,
        saving: opt.valueSaving,
        total: opt.valueTotal,
        task: opt.task,
        type: opt.type,
        category: opt.category,
        completed: false,
      },
    ]);
    setSavingValue(savingValue + opt.valueSaving);
    setTotalValue(totalValue + opt.valueTotal);

    if (question.id === 9 && opt.text === 'No') {
      setQuestionIndex(questionIndex + 2);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };




  const saveAnswers = async () => {
    try {
      await AsyncStorage.setItem('answers', JSON.stringify(answers));
      await AsyncStorage.setItem(
        'benchmark',
        JSON.stringify({ savingValue: savingValue, totalValue: totalValue })
      );
      await AsyncStorage.setItem('isTaken', JSON.stringify(true));
      // saveUserDataToAttributes();
      // setHasSurvey(true)
      // takeTest();
      const success = await saveUserDataToAttributes();

      if (success) {
        setHasSurvey(true);
        takeTest();
      } else {
        // Display an alert if saving the data fails
        alert('Failed to save user data. Please retry.' + username);
      }
    } catch (error) {
      console.log(error);
      alert('Failed to save answers. Please try again.');
    }
  };

  const saveUserDataToAttributes = async () => {


    try {
      console.log("usernamex", username)
      if (username === "" || username === "-"|| username.trim() === "") {
        console.log('user name not retrived');
        return false;
      }

      //  console.log('Post saved successfully!',r);
      const currentTime = new Date().toISOString();

      const posts = await DataStore.query(Statisticx, (c) => c.username.eq(username));
      if (posts.length > 0) {
        const updatedUserData = posts[0];


        const updatedPost = await DataStore.save(
          Statisticx.copyOf(updatedUserData, updated => {
            updated.savedvalue = savingValue;
            updated.totalvalue = totalValue;
            updated.currerntsavedvalue = savingValue;
            updated.currentotalvalue = totalValue;
            updated.lastupdatetime = currentTime;
            updated.startdate = currentTime;
            updated.visitcount = 1;
          })
        );
        console.log('User data updated successfully!', updatedPost);



      } else {
        if (username === "" || username === "-" || username.trim() === "") {
          console.log('user name not retrived');
          return;
        }
        const r = await DataStore.save(
          new Statisticx({
            "username": username,
            "savedvalue": savingValue,
            "totalvalue": totalValue,
            "currerntsavedvalue": savingValue,
            "currentotalvalue": totalValue,
            "startdate": currentTime,
            "visitcount": 1,
            "lastupdatetime": currentTime
          })
        );

      }
      console.log('Posts retrieved successfully!', JSON.stringify(posts, null, 2));
      return true;

    } catch (error) {
      console.log('Error :', error);
      alert(error)
      return false;
    }
  };



  useEffect(() => {
    // Update progress when questionIndex changes
    const newProgress = (questionIndex / questionsw.length) * 100;
    Animated.timing(progress, {
      toValue: newProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [questionIndex, questionsw.length, progress]);

  
  const currentQuestion = questionsw[questionIndex];

  return (
    <View style={styles.container}>
     <View style={styles.progressBarContainer}>
      <Animated.View 
        style={[
          styles.progressBar, 
          { 
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%']
            }) 
          }
        ]} 
      />
    </View>

      {questionIndex < questionsw.length ? (
        <View style={styles.card}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          <View style={styles.optionsContainer}>
            {currentQuestion?.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelectOption(currentQuestion, option)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View>
        <View style={styles.waterDropContainer}>
          <Image source={require('./images/category/drop.png')} style={styles.waterDropImage} />

        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>You saved</Text>
            <Text style={styles.infoValue}>{savingValue} L</Text>
            <Text style={styles.infoText}>water!</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Your water footprint</Text>
            <Text style={styles.infoValue}>{totalValue} L!</Text>
          </View>
          {/* <View style={styles.infoRow}>
            <Text style={styles.infoText}>Istanbul dam fill rate </Text>
            <Text style={styles.infoValue}>95%</Text>
          </View> */}
        </View>


        <Text style={styles.finalText}>Thank you for taking the survey!!!</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveAnswers}>
          <Text style={styles.saveButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    width: '100%',
    height: '100%',
  },
  questionText: {
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure options container takes full width of the card
  },
  optionButton: {
    backgroundColor: '#3498db',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '90%', // Consistent width for all buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text for better visual appearance
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '95%', // Set a max width for the card
    maxWidth: 500, // Maximum width can be adjusted as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center', // Ensure card is always centered
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#3498db',
  },
  finalText: {
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waterDropContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterDropImage: {
    width: 120,
    height: 120,
  },
  savingValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 30,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Wizard;
