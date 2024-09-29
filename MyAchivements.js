
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalStorage } from './useLocalStorage';
import { GlobalContext } from './GlobalContext';
const MyAchivements = () => {
  //const [answers, setAnswers] = useLocalStorage('answers', []);
  const { answers, setAnswers } = useContext(GlobalContext);
  // Filter the answers array to get only the achievements
  const achievements = answers.filter((answer) => answer.type === 'Achievement');

  return (
    <ScrollView contentContainerStyle={styles.container}>
       
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.task}>
          <Text style={styles.taskSign}>{getAchievementSign(achievement.category)}</Text>
          <View style={styles.taskDetails}>
            <Text style={styles.taskName}>{achievement.task}</Text>
            <Text style={styles.taskCategory}>{achievement.category}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskSign: {
    fontSize: 20,
    marginRight: 10,
  },
  taskDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 16,
    color: '#888',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});

// Helper function to get the sign based on the achievement category
const getAchievementSign = (category) => {
  switch (category) {
    case 'Dishwashing':
      return '🏆'; // Cup sign for Dishwashing achievements
    case 'Plumbing':
      return '⭐️'; // Star sign for Plumbing achievements
    case 'Shower':
      return '🏅'; // Medal sign for Shower achievements
    case 'Laundry':
      return '🌟'; // Star sign for Laundry achievements
    case 'Daily activities':
      return '🎉'; // Confetti sign for Daily activities achievements
    case 'Car owners':
      return '🚗'; // Car sign for Car owners achievements
    default:
      return '🏆'; // Default cup sign if category not found
  }
};

export default MyAchivements;
