/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import fetchWrapper from './app/fetchWrapper';

interface UserInfo {
  name: string;
}

function Home(): JSX.Element {
  const [loading, isLoading] = useState(false);
  const [user, setUserData] = useState<UserInfo>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        isLoading(true);
        const randomUser: number = Math.floor(Math.random() * 10) + 1;
        const response = await fetchWrapper(`users/${randomUser}`)
          .then(response => response?.json())
          .then(data => setUserData(data));
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading(false);
      }
    };
    fetchUsers();
  }, []);

  /*
  {"address": {"city": "Gwenborough", "geo": {"lat": "-37.3159", "lng": "81.1496"}, "street": "Kulas Light", "suite": "Apt. 556", "zipcode": "92998-3874"},
  "company": {"bs": "harness real-time e-markets", "catchPhrase": "Multi-layered client-server neural-net",
  "name": "Romaguera-Crona"}, "email": "Sincere@april.biz", "id": 1, "name": "Leanne Graham", "phone": "1-770-736-8031 x56442", "username": "Bret", "website": "hildegard.org"}
*/

  return (
    <SafeAreaView>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
}
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
