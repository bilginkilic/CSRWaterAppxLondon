import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useLocalStorage } from './useLocalStorage';
import { GlobalContext } from './GlobalContext';
const SubSurvey = ({ navigation, route }) => {
  const question = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const { globalArray, setGlobalArray } = useContext(GlobalContext);
  //const [answers, setAnswers] = useLocalStorage('answers', []);
  const { answers, setAnswers } = useContext(GlobalContext);
  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);


  useEffect(() => {
    //console.log('Updated selectedTasks:', selectedTasks);
    setGlobalArray(selectedTasks)
  }, [selectedTasks]);


  const handleOptionSelection = (answer, opt) => {
    setSelectedOption(opt);

//console.log("MJS",opt)
    //update the answers

    const questionIdToUpdate = question.id;
    const indexToUpdate = answers.findIndex((answer) => answer.questionid === questionIdToUpdate);

    const updatedAnswers = [...answers];
    updatedAnswers[indexToUpdate] = {
      ...updatedAnswers[indexToUpdate],
      completed: true,
      type:"Achievement",
      saving: opt.valueSaving,
      total: opt.valueTotal
    };

    setAnswers(updatedAnswers);


    if (opt.type === 'Achievement') {
      const taskIndex = selectedTasks.findIndex(
        (task) => task.questionid == question.id
      );

      if (taskIndex !== -1) {
        const updatedTasks = [...selectedTasks];

        updatedTasks.splice(taskIndex, 1);


        setSelectedTasks(updatedTasks);

      }
     // navigation.goBack(); // Go back to the previous screen
     navigation.navigate('TaskToFinale');
    }else{
      showAlert();
      navigation.goBack(); 
    }
  };

  const showAlert = () => {
    Alert.alert('Info', 'You can do better! Consider other options to save more water next time.', [{ text: 'OK' }], { cancelable: false });
  };
  const handleCompleteSubSurvey = () => {
    navigation.goBack(); // Go back to the previous screen
  };



  return (
    <View style={styles.container}>
          <Text style={styles.contentText}>{question.content.message}</Text>
      <Text style={styles.questionText}>{question.text}</Text>
  
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOptionButton,
          ]}
          onPress={() => handleOptionSelection(option.text, option)}
        >
          <Text style={styles.optionText}>{option.text}  </Text>
        </TouchableOpacity>
        
      ))}
       
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding:10
  },
  contentText: {
    fontSize: 22,
    fontStyle: 'italic',
    padding: 10,
    marginBottom: 20,
    
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
}
,
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#3498db', // Blue color for the selected option
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  completeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    backgroundColor: '#4caf50', // Green color for the complete button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubSurvey;
