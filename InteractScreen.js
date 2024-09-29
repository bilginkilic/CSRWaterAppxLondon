import * as React from 'react';


import {  Text, View, Image } from 'react-native';
import TaskScreen from './TaskScreen';
import Wizard from './Wizard';




const InteractScreen = () => {


    return (<>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
         <Wizard></Wizard>
             
  
    </View>
        </>
    );

}

export default InteractScreen;