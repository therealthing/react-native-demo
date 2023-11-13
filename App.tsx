/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes, StackParamList} from './app/routes';
import {NavigationContainer} from '@react-navigation/native';
import fetchWrapper from './app/fetchWrapper';
import {Context} from './app/contextProvider';

interface UserInfo {
  name: string;
}

const Stack = createNativeStackNavigator();
const randomUser: number = Math.floor(Math.random() * 10) + 1;

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
  const [currentUser, setCurrentUser] = React.useState<number>();
  React.useEffect(() => {
    setCurrentUser(randomUser);
  }, []);

  return (
    <NavigationContainer>
      <Context.Provider value={currentUser}>
        <Stack.Navigator initialRouteName="Dashboard">
          {routes.map(route => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              initialParams={route.initialParams}
            />
          ))}
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}

export default App;
