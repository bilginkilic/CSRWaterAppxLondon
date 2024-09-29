 /* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { GlobalContext } from './GlobalContext';
import 'core-js/full/symbol/async-iterator';

// import { DataStore } from 'aws-amplify';
import { DataStore } from 'aws-amplify';
import { Statisticx } from './src/models';

function ProfileScreen() {


  const { signOut } = React.useContext(AuthContext);
  // const [answers, setAnswers] = useLocalStorage('answers', []);
  const { answers, setAnswers } = useContext(GlobalContext);
  const [savingValue, setSavingValue] = useLocalStorage('savingValue', 0);
  const [totalValue, setTotalValue] = useLocalStorage('totalValue', 0);

  const [savingValueStoredToCloud, setSavingValueStoredToCloud] = useLocalStorage('savingValueStoredToCloud', 0);
  const [totalValueStoredToCloud, setTotalValueStoredToCloud] = useLocalStorage('totalValueStoredToCloud', 0);

  const [currentSavingValue, setcurrentSavingValue] = useState(0);
  const [currentTotalValue, setcurrentTotalValue] = useState(0);
  const [currentSavingValueText, setcurrentSavingValueText] = useState('calculating...', '');
  const [currentTotalValueText, setcurrentTotalValueText] = useState('calculating...', '');



  const [username, setUsername] = useLocalStorage('username', '');


  useEffect(() => {
    const interval = setInterval(() => {
      calculateValues();
    }, 5000); // Change tip every 20 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [savingValue, totalValue, savingValueStoredToCloud, totalValueStoredToCloud, username, currentSavingValue, currentTotalValue, answers, calculateValues]);

  const calculateValues = () => {
    let currentTotalValue = 0;
    let currentSavingValue = 0;

    answers.forEach((answer) => {
      currentTotalValue += answer.total;
      currentSavingValue += answer.saving;
    });
    //  console.log("currentTotalValue",currentTotalValue);
    //  console.log("currentSavingValue",currentSavingValue);
    setcurrentTotalValue(currentTotalValue);
    setcurrentSavingValue(currentSavingValue);


    let comparisonText = '';

    if (currentSavingValue > savingValue && savingValue > 0) {

      let compSaving = (currentSavingValue - savingValue) / savingValue * 100;
      comparisonText = 'You have increased saved water by !' + compSaving.toFixed(2) + "%";
      setcurrentSavingValueText(comparisonText)
    } else {
      setcurrentSavingValueText('')
    }


    if (currentTotalValue < totalValue) {

      let compTotal = (totalValue - currentTotalValue) / totalValue * 100;
      comparisonText = 'You have decreased water footprint by !' + compTotal.toFixed(2) + "%";
      setcurrentTotalValueText(comparisonText)
    } else {
      setcurrentTotalValueText('')
    }


    //console.log("no db",totalValue , totalValueStoredToCloud , savingValue, savingValueStoredToCloud,currentSavingValue, currentTotalValue)
    if (currentTotalValue != totalValueStoredToCloud || currentSavingValue != savingValueStoredToCloud) {
      console.log("go to db", totalValue, totalValueStoredToCloud, savingValue, savingValueStoredToCloud);
      saveUserDataToAttributes();
    } else {
      console.log("no db", totalValue, totalValueStoredToCloud, savingValue, savingValueStoredToCloud, currentSavingValue, currentTotalValue)
    }



  };





  const saveUserDataToAttributes = async () => {

   
    try {
      console.log("usernamex", username)
      if (username === "" || username === "-" || username.trim() === "") {
        console.log('user name not retrived');
        return;
      }

       
      

      
      //  console.log('Post saved successfully!',r);
      const currentTime = new Date().toISOString();

      const posts = await DataStore.query(Statisticx, (c) => c.username.eq(username));
 
      console.log('Posts retrieved successfully!', JSON.stringify(posts, null, 2));
      if (posts.length > 0) {
        console.log("update called")
        const updatedUserData = posts[0];


        const updatedPost = await DataStore.save(
          Statisticx.copyOf(updatedUserData, updated => {
            //updated.savedvalue = savingValue;
            //updated.totalvalue = totalValue;
            updated.currerntsavedvalue = currentSavingValue;
            updated.currentotalvalue = currentTotalValue;
            updated.lastupdatetime = currentTime;
            updated.visitcount = updatedUserData.visitcount + 1;
          })
        );
        console.log('User data updated successfully!', updatedPost);

        setTotalValueStoredToCloud(currentTotalValue);
        setSavingValueStoredToCloud(currentSavingValue);

      } else {
        console.log("saved called")
        if (username === "" || username === "-" || username.trim() === "") {
          console.log('user name not retrived');
          return;
        }
        const r = await DataStore.save(
          new Statisticx({
            "username": username,
            "savedvalue": savingValue,
            "totalvalue": totalValue,
            "currerntsavedvalue": currentSavingValue,
            "currentotalvalue": currentTotalValue,
            "startdate": currentTime,
            "visitcount": 1,
            "lastupdatetime": currentTime
          })
        );
        console.log("savedx", r);

      }
    
      setTotalValueStoredToCloud(currentTotalValue);
      setSavingValueStoredToCloud(currentSavingValue);

     
    } catch (error) {
      console.log('Error :', error);
    }
  };


  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi, Welcome</Text>
        <Text style={styles.username}>{username}!</Text>
      </View>

      <View style={styles.waterDropContainer}>
        <Image source={require('./images/category/drop.png')} style={styles.waterDropImage} />

      </View>

      <View style={styles.infoContainer}>

        {currentSavingValueText !== '' ? (<>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>You saved</Text>
            <Text style={styles.infoValue}>{currentSavingValue} L</Text>
            <Text style={styles.infoText}>water!</Text>
          </View>

        </>) : (<>


          {/* <View style={styles.infoRow}>
            <Text style={styles.infoText}>You saved</Text>
            <Text style={styles.infoValue}>{savingValue} L</Text>
            <Text style={styles.infoText}>water!</Text>
          </View> */}

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Your saved</Text>
            <Text style={[styles.infoValue, { color: currentSavingValue >= 0 ? 'green' : 'red' }]}>
              {currentSavingValue >= 0 ? currentSavingValue + ' L' : '0'}
            </Text>
            <Text style={styles.infoText}> water!</Text>
          </View></>

        )}


        {currentTotalValueText !== '' ? (<>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Your water footprint</Text>
            <Text style={styles.infoValue}>{currentTotalValue} L!</Text>
          </View>
        </>) : (<>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Your water footprint</Text>
            <Text style={styles.infoValue}>{totalValue} L!</Text>
          </View>

        </>)}


        {/* <View style={styles.infoRow}>
          <Text style={styles.infoText}>Istanbul dam fill rate </Text>
          <Text style={styles.infoValue}>95%</Text>
        </View> */}
        {currentSavingValueText !== '' ? (<><View style={styles.infoRow}>
          <Text style={styles.infoText}>{currentSavingValueText} </Text>

        </View>
        </>) : (<></>)}
        {currentTotalValueText !== '' ? (<>
          <View style={styles.infoRow}>

            <Text style={styles.infoText}>{currentTotalValueText} </Text>
          </View></>) : (<></>)}
      </View>






      {/* {<TouchableOpacity style={styles.signOutButton} onPress={saveUserDataToAttributes}>
        <Text style={styles.signOutButtonText}>Submit my data to dashboard</Text>
      </TouchableOpacity>} */}
      <Text style={styles.signOutButtonText}></Text>
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff', // A light color for the card
    borderRadius: 20, // Rounded corners
    shadowColor: '#000', // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
    width: '100%', // Adjust as needed
    maxWidth: 500, // Maximum width for larger devices
    padding: 20, // Inner padding
  },
   
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
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
  signOutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  signOutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;
