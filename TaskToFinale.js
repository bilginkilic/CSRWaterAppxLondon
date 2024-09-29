import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalStorage } from './useLocalStorage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';
// TaskToFinale.js'
import questions from './questionsData'


const TaskToFinale = () => {
  const navigation = useNavigation();
  const { globalArray, setGlobalArray } = useContext(GlobalContext);

  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);





  const handleTaskSelection = (task) => {


    const taksQuestion = questions.find((answer) => answer.id == task.questionid);


    navigation.navigate('MiddleScreen', taksQuestion);

  };



  useFocusEffect(
    React.useCallback(() => {
      //console.log("welcome back cr",globalArray)
      // Update selectedTasks whenever the screen gains focus
      setSelectedTasks(globalArray);
    }, [setSelectedTasks, globalArray])
  );



  return (

    <ScrollView contentContainerStyle={styles.container}>

      {selectedTasks.length > 0 ? (selectedTasks.map((task) => (
        <TouchableOpacity
          key={task.questionid}
          style={[
            styles.task
            //  task.completed && styles.completedTask,
          ]}
          onPress={() => handleTaskSelection(task)}
        >
          <Text style={styles.taskName}>{task.task}</Text>
          <Text style={styles.taskCategory}>{task.category}</Text>
        </TouchableOpacity>
      ))) : (

        <Text style={styles.emptyText}>Horray, nothing to do here! 🎉 If you want to do more go to tasks to select more tasks</Text>
      )}

    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  completedTask: {
    backgroundColor: '#c8f7c5', // Light green color for completed task
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 16,
    color: '#888',
  },
  completeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#4caf50', // Green color for the complete button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subPageContainer: {
    marginTop: 20,
  },
  subPageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskToFinale;
