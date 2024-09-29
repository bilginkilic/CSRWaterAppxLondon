import { AsyncStorage } from 'react-native';
import React from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = React.useState(initialValue);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        setState(value != null ? JSON.parse(value) : initialValue);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const setValue = async (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setState(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  const showAllLocalStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      const data = keys.map((key, index) => ({ key, value: values[index][1] }));
    //  console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const saveAllToUserAttributes = async () => {
  //   try {
  //     console("MAXO")
  //     const keys = await AsyncStorage.getAllKeys();
  //     const values = await AsyncStorage.multiGet(keys);

  //     // Prepare the data to be saved to user attributes
  //     const userData = keys.reduce((data, key, index) => {
  //       const value = values[index][1];
  //       data[key] = JSON.parse(value);
  //       return data;
  //     }, {});

       

  //  // console.log('All values saved to user attributes:', userData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

   // Function to save data to user attributes


  

  return [state, setValue, clearStorage,showAllLocalStorage];
};
