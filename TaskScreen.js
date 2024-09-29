import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
 
import { useLocalStorage } from './useLocalStorage';

const TaskScreen = () => {



  
  const [taskIndex, setTaskIndex] = useLocalStorage('taskIndex', 0);
  const [completedTasks, setCompletedTasks] =  useLocalStorage('completedTasks', []); 
   

 

  const handleCompleteTask = (index) => {
    setCompletedTasks([...completedTasks, index]);
    setTaskIndex(taskIndex + 1);
  }

 
 const currentTask =tasks[taskIndex];
  
 

  return (
    <View style={styles.container}>
      {taskIndex < tasks.length ? (
        <View>
          <Text style={styles.title}>{currentTask.title}</Text>
          <Image source={currentTask.image} style={styles.image} />
          <Text style={styles.description}>{currentTask.description}</Text>
          <TouchableOpacity style={styles.completeButton} onPress={() => handleCompleteTask(taskIndex)}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Image source={require('./images/badge.png')} style={styles.image} />
          <Text style={styles.finalText}>Congratulations on completing all tasks!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  description: {
    fontSize: 14,
    margin: 10,
    textAlign: 'center',
  },
  image: {
    width: 300,
    margin: 10,
  },
  completeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold'
},
finalText: {
fontSize: 24,
fontWeight: 'bold',
margin: 10,
},
});

export default TaskScreen;