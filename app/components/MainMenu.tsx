/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image} from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import {NavigationProp} from '@react-navigation/native';

type LinkInfo = {
  label: string;
  action: () => void;
};
export type StackParamList = {
  Dashboard: undefined;
  Blog: {postId?: number};
};

export interface MainMenuProps {
  navigation: NavigationProp<any, any>;
}

export const MainMenu = ({navigation}: MainMenuProps) => {
  const menuLinks: LinkInfo[] = [
    {
      label: 'Dashboard',
      action: () => navigation.navigate('Dashboard'),
    },
    {
      label: 'Blogs',
      action: () => navigation.navigate('Blog'),
    },
  ];

  return (
    <View>
      <Image
        source={require('../../app/assets/avatar.png')}
        style={{width: 60, height: 60, marginLeft: 30, marginTop: 30}}
      />
      <WhiteSpace />
      {menuLinks.map(link => (
        <React.Fragment key={link.label}>
          <Button
            key={`menu-${link.label}`}
            onPress={link.action}
            type="primary">
            {link.label}
          </Button>
          <WhiteSpace key={`spacer-${link.label}`} />
        </React.Fragment>
      ))}
    </View>
  );
};
