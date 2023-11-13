import 'react-native';
import React from 'react';
import DashboardScreen from '../DashboardScreen';
import {render, waitFor, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({goBack: jest.fn()}),
    useRoute: () => ({
      params: {},
    }),
  };
});
const MOCK_DATA = {
  address: {
    city: 'South Elvis',
    street: 'Hoeger Mall',
  },
  company: {
    name: 'Robel-Corkery',
  },
  name: 'Patricia Lebsack',
};

jest
  .spyOn(global, 'fetch')
  .mockImplementation(() =>
    Promise.resolve({json: () => Promise.resolve(MOCK_DATA)}),
  );

it('fetches user info correctly', async () => {
  render(
    <NavigationContainer>
      <DashboardScreen />
    </NavigationContainer>,
  );

  await waitFor(() => {
    expect(screen.getByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Company: Robel-Corkery')).toBeTruthy();
  });
});
