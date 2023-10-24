import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
//import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';
import RecipesScreen from './components/RecipesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import Adaptive from './assets/adaptive-icon.png';
import Favicon from './assets/favicon.png';
import Icon from './assets/icon.png';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

// Importer Firebase Services
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SettingsScreen from './components/SettingsScreen';
import RatingScreen from './components/RatingScreen';

const firebaseConfig = {
  apiKey: "AIzaSyA_CGbzFxYiKPzJDuEdAaLK6istzHrDi1c",
  authDomain: "godkendelsesopgave-4260c.firebaseapp.com",
  projectId: "godkendelsesopgave-4260c",
  storageBucket: "godkendelsesopgave-4260c.appspot.com",
  messagingSenderId: "628031124795",
  appId: "1:628031124795:web:f7f3dd941f2b753143331e",
  measurementId: "G-4NS19R84C6"
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  console.log('Firebase On!');
} else {
  console.log('Firebase not on!');
}

const auth = getAuth();

function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({ loggedIn: true, user: user });
      console.log('You are logged in!');
    } else {
      callback({ loggedIn: false });
    }
  });
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Profile') {
              return (
                <Image
                  source={Adaptive}
                  style={{ width: size, height: size, tintColor: color }}
                />
              );
            } else if (route.name === 'Groceries') {
              return (
                <Image
                  source={Favicon}
                  style={{ width: size, height: size, tintColor: color }}
                />
              );
            } else if (route.name === 'Calories') {
              return (
                <Image
                  source={Icon}
                  style={{ width: size, height: size, tintColor: color }}
                />
              );
            }
          },
        })}
      >
        {user.loggedIn ? (
          <>
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Groceries" component={HomeScreen} />
            <Tab.Screen name="Calories" component={SettingsScreen} />
            <Tab.Screen name="Recipes" component={RecipesScreen} />
            <Tab.Screen name="Ratings" component={RatingScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={LoginForm} />
            <Tab.Screen name="Sign Up" component={SignUpForm} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
