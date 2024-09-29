import * as React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, View, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import { Auth } from 'aws-amplify';
import { useLocalStorage } from './useLocalStorage';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useLocalStorage('username', '');
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [userWithChallenge, setUserWithChallenge] = React.useState(null); // Store user with challenge
  const [resetPassword, setResetPassword] = React.useState(false); // State for password reset

  const handleSignIn = async () => {
    try {
      if (username === '' || password === '') {
        Alert.alert('WARN', 'Username or password must be filled.');
      } else {
        const user = await Auth.signIn(username, password);
        console.log('user signed in: ', user);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          setUserWithChallenge(user); // Store user with challenge
        } else {
          setUsername(username)
          signIn({ userToken: user.Session });
      
        }
      }
    } catch (error) {
      Alert.alert('OOPSS', error.message);
    }
  };

  const handleNewPasswordSubmit = async () => {
    try {
      const loggedUser = await Auth.completeNewPassword(userWithChallenge, newPassword);
      console.log(loggedUser);
      setUsername(username)
      signIn({ userToken: userWithChallenge.Session });
    } catch (error) {
      Alert.alert('OOPSS', error.message);
    }
  };

  // Collect confirmation code and new password
const forgotPasswordSubmit = async()=> {
  try {
    const data = await Auth.forgotPasswordSubmit(username, code, password);
    console.log(data);
    Alert.alert('DONE!', 'Pass changed');
    setResetPassword(false);
  } catch(err) {
    Alert.alert('OOPSS', err.message);
  }
}

  const handleForgotPassword = async () => {
    try {
      await Auth.forgotPassword(username); // Initiate password reset for the provided username
      setResetPassword(true); // Set the reset password state to true

    } catch (error) {
      Alert.alert('OOPSS', error.message);
    }
  };

  const { resetState, signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to WaterApp</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      {resetPassword ? (
        <TextInput
          style={styles.input}
          placeholder="code (check your email - also junk mail-)"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={code}
          onChangeText={setCode}
        />
      ) : (
        userWithChallenge && userWithChallenge.challengeName === 'NEW_PASSWORD_REQUIRED' && (
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={newPassword}
            onChangeText={setNewPassword}
          />
        )
      )}
      <TouchableOpacity style={styles.buttonContainer} onPress={resetPassword ? forgotPasswordSubmit : (userWithChallenge?.challengeName === 'NEW_PASSWORD_REQUIRED' ? handleNewPasswordSubmit : handleSignIn)}>
        <View>
          <Text style={styles.buttonText}>{resetPassword ? 'RESET PASSWORD' : 'LOGIN'}</Text>
        </View>
      </TouchableOpacity>
      {!resetPassword && (
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.8,
    padding: 10,
  },
  title: {
    color: '#333',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#fff',
    color: '#333',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 5,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: '#666',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
