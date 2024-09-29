/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SplashScreen from './SplashScreen';
import { AuthContext } from './AuthContext';
import MainScreenToFinale from './MainScreenToFinale';

import { useLocalStorage } from './useLocalStorage';
import TaskToFinale from './TaskToFinale';
import MyAchivements from './MyAchivements';
import TaskOptions from './TaskOptions';
import SubSurvey from './SubSurvey';
import MiddleScreen from './MiddleScreen';
import { GlobalProvider, GlobalContext } from './GlobalContext';

 


 

const Stack = createStackNavigator();

function App() {
 

  const [username, setUsername] = useLocalStorage('username', '');
  const [hasSurvey, setHasSurvey] = useLocalStorage('hasSurvey', false);
  const [userToken, setUserToken] = useLocalStorage('userToken', '');
  const [questionIndex, setQuestionIndex] = useLocalStorage('questionIndex', 0);
  const [answers, setAnswers] = useLocalStorage('answers', []);
  // const { answers, setAnswers } = useContext(GlobalContext);
  const [savingValue, setSavingValue] = useLocalStorage('savingValue', 0);
  const [totalValue, setTotalValue] = useLocalStorage('totalValue', 0);
  const [questions, setQuestions] = useLocalStorage('questions', []);
  const [questionsw, setQuestionsw] = useLocalStorage('questionsw', []);
  const [selectedTasks, setSelectedTasks] = useLocalStorage('selectedTasks', []);
  // const { globalArray, setGlobalArray } = useContext(GlobalContext);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            hasSurvey: action.hasSurvey,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            userToken: action.token,
            hasSurvey: action.hasSurvey,
          };
        case 'TAKE_TEST':
          return {
            ...prevState,
            hasSurvey: action.hasSurvey,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: '',
            hasSurvey: action.hasSurvey
          };
        case 'RESET_STATE':
          return {
            isLoading: true,
            isSignout: false,
            userToken: null,
            hasSurvey: null,
            questionIndex: 0,
            answers: []
          };
      }
    },
    {
      isLoading: false,
      isSignout: true,
      userToken: null,
      hasSurvey: null,
      questionIndex: 0,
      answers: []
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {




      dispatch({ type: 'RESTORE_TOKEN', token: userToken, hasSurvey: hasSurvey });
    };
    bootstrapAsync();
  }, [userToken,hasSurvey]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        if (data.userToken !== '') {
          setUserToken(data.userToken);
           
          dispatch({ type: 'SIGN_IN', token: data.userToken,hasSurvey: hasSurvey });
           
          // console.log('state:', state);
        }
      },
      signOut: () => {


        setUserToken('')
        setUsername('')
        dispatch({ type: 'SIGN_OUT',hasSurvey:false})
      }

      ,
      takeTest: () => {

        setHasSurvey(true);
        dispatch({ type: 'TAKE_TEST', hasSurvey: true });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },

      resetState: () => {
        setQuestionIndex(0)
        setAnswers([])
        setSavingValue(0)
        setTotalValue(0)
        setQuestions([])
        setSelectedTasks([])
        //   setQuestionsw([])
        dispatch({ type: 'RESET_STATE' });
      }
    })
   //,[setHasSurvey]
  );
  return (
    <GlobalProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              // Uygulama yüklenirken Splash ekranını göster
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == '' ? (
              // Kullanıcı oturumu açmadıysa giriş ekranını göster
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: 'Sign in',
                }}
              />
            ) : (
              // Kullanıcı oturum açtıysa ana ekranı göster - anket yok
              (state.hasSurvey ?
                <Stack.Group>
                  <Stack.Screen
                    name="MainScreenToFinale"
                    component={MainScreenToFinale}
                    options={{
                      title: 'WaterApp',
                    }}
                  />

                  <Stack.Screen name="TaskToFinale" component={TaskToFinale} options={{
                    title: 'Complete your tasks',
                  }} />
                  <Stack.Screen name="MyAchivements" component={MyAchivements} options={{
                    title: 'The Achivements',
                  }} />
                  <Stack.Screen name="TaskOptions" component={TaskOptions} options={{
                    title: 'Choose a task to do!',
                  }} />
                  <Stack.Screen name="SubSurvey" component={SubSurvey} options={{
                    title: 'become more conscious?',
                  }} />
                  <Stack.Screen name="MiddleScreen" component={MiddleScreen} options={{
                    title: 'Training...',
                  }} />
                </Stack.Group>

                : <Stack.Group>
                  <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                      title: 'WATER APP',
                    }}
                  />
                  <Stack.Screen name="TaskToFinale" component={TaskToFinale} />
                  <Stack.Screen name="MyAchivements" component={MyAchivements} />
                  <Stack.Screen name="TaskOptions" component={TaskOptions} />
                </Stack.Group>

              )
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </GlobalProvider>
  );
}

export default   App;
