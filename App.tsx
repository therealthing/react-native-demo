import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './app/routes';
import {NavigationContainer} from '@react-navigation/native';
import {Context} from './app/contextProvider';

const Stack = createNativeStackNavigator();
const randomUser: number = Math.floor(Math.random() * 10) + 1;

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
