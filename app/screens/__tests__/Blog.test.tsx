import 'react-native';
import React from 'react';
import BlogScreen from '../BlogScreen';
import {render, waitFor, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({goBack: jest.fn()}),
    useRoute: () => ({
      params: {
        postId: undefined,
      },
    }),
  };
});
const MOCK_DATA = [
  {userId: 1, id: 1000, title: 'lorem', body: 'ipsum'},
  {userId: 1, id: 1001, title: 'valum', body: 'est'},
];

jest
  .spyOn(global, 'fetch')
  .mockImplementation(() =>
    Promise.resolve({json: () => Promise.resolve(MOCK_DATA), headers: []}),
  );

it('fetches posts correctly', async () => {
  render(
    <NavigationContainer>
      <BlogScreen />
    </NavigationContainer>,
  );

  await waitFor(() => {
    expect(screen.getByText("What's new")).toBeTruthy();
    expect(screen.getByText('valum')).toBeTruthy();
  });
});
