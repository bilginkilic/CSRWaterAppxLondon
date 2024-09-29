import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tasks from './TasksOrjinal';
import { GlobalContext } from './GlobalContext';

const MyTaskScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { answers, setAnswers } = useContext(GlobalContext);
  const remainingTaskList = answers.filter((answer) => answer.type === 'Task' && !answer.completed);

  const hasTasksInCategory = (category) => {
    return remainingTaskList.some((task) => task.category === category);
  };

  const handleSelectCategory = (category) => {
    navigation.navigate('TaskOptions', { categoryId: category });
    setSelectedCategory(category);
  };

  const renderTaskCategories = () => {
    return Array.from(new Set(tasks.map((task) => task.category))).map((category) => {
      const isActive = hasTasksInCategory(category);
      return (
        <TouchableOpacity
          key={category}
          style={[
            styles.button,
            { opacity: isActive ? 1 : 0.5 }
          ]}
          onPress={() => isActive && handleSelectCategory(category)}
          disabled={!isActive}
        >
          <ImageBackground
            source={getImageForCategory(category)}
            style={styles.imageBackground}
            imageStyle={[styles.image, !isActive && styles.inactiveImage]}
            blurRadius={!isActive ? 2 : 0}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    });
  };

  const renderNoTasksMessage = () => {
    return (
      <View style={styles.noTasksContainer}>
        <Text style={styles.noTasksText}>Congratulations!!</Text>
        <Text style={styles.noTasksText}>You completed all fundamental tasks!</Text>
        <Text style={styles.noTasksText}>You are a ‘Role Model’!</Text>
        <Text style={styles.noTasksText}>Stay in touch for upcoming challenges...</Text>
      </View>
    );
  };

  // Helper function to get the image for each category
  const getImageForCategory = (category) => {
    switch (category) {
      case 'Dishwashing':
        return require('./images/category/dishwashing.jpg');
      case 'Plumbing':
        return require('./images/category/plumbing.jpeg');
      case 'Shower':
        return require('./images/category/shower.jpg');
      case 'Laundry':
        return require('./images/category/laundry.jpg');
      case 'Daily activities':
        return require('./images/category/dailyactivities.jpeg');
      case 'Car owners':
        return require('./images/category/carowners.jpg');
      // Add more cases for other categories and their respective images
      default:
        return require('./images/category/carowners.jpg'); // Default image if category not found
    }
  };

  return (
    <View style={styles.container}>
      {remainingTaskList.length > 0 ? (
        <View style={styles.buttonContainer}>{renderTaskCategories()}</View>
      ) : (
        renderNoTasksMessage()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  inactiveImage: {
    opacity: 0.5, // Reduced opacity for inactive categories
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default MyTaskScreen;
