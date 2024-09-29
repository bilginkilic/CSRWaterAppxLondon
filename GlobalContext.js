import React, { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Create the global context
export const GlobalContext = createContext();

// Create a custom hook to access the global context
export const useGlobalContext = () => useContext(GlobalContext);

// Create a provider component to wrap your app and provide the global state
export const GlobalProvider = ({ children }) => {
  const [globalArray, setGlobalArray] = useLocalStorage('selectedTasks', []);
  const [answers, setAnswers] = useLocalStorage('answers', []);

  // You can add more variables and state management here

  return (
    <GlobalContext.Provider value={{ globalArray, setGlobalArray, answers, setAnswers }}>
      {children}
    </GlobalContext.Provider>
  );
};
