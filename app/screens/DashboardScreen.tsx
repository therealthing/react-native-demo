/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenContainer, SidebarContainer} from './wrappers';
import {SafeAreaView, Text} from 'react-native';
import fetchWrapper from '../fetchWrapper';
import {MainMenu} from '../components/MainMenu';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import View from '@ant-design/react-native/lib/view';
import WingBlank from '@ant-design/react-native/lib/wing-blank';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import Card from '@ant-design/react-native/lib/card';
import {StackParamList} from '../routes';
import {Context} from '../contextProvider';
import {colors} from './constants';

type AddressDetails = {
  street: string;
  city: string;
};

type CompanyDetails = {
  name: string;
};
interface UserInfo {
  name: string;
  company: CompanyDetails;
  address: AddressDetails;
}
type DashboardProps = NativeStackScreenProps<StackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<DashboardProps> = function ({
  navigation,
}: DashboardProps) {
  const [user, setUserData] = useState<UserInfo>();
  const randomUser = useContext(Context);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchUsers = async () => {
        await fetchWrapper(`users/${randomUser}`, 'GET', null)
          .then(response => response?.json())
          .then(data => (isActive ? setUserData(data) : null));
      };
      fetchUsers();

      return () => {
        isActive = false;
      };
    }, [randomUser]),
  );

  return (
    <SafeAreaView>
      <ScreenContainer>
        <View style={{flexBasis: '35%'}}>
          <SidebarContainer>
            <MainMenu navigation={navigation} />
          </SidebarContainer>
        </View>
        <View style={{flexBasis: '65%', backgroundColor: colors.white}}>
          <WhiteSpace />
          <View style={{marginLeft: 4, backgroundColor: colors.white}}>
            <WingBlank size="lg">
              <Card>
                <Card.Header title="Personal details" />
                <Card.Body>
                  <View style={{height: '50%', marginLeft: 12}}>
                    <Text style={{lineHeight: 24}}>Name: {user?.name}</Text>
                    <Text style={{lineHeight: 24}}>
                      Address: {user?.address?.street}
                    </Text>
                    <Text style={{lineHeight: 24}}>
                      City: {user?.address?.city}
                    </Text>
                    <Text style={{lineHeight: 24}}>
                      Company: {user?.company?.name}
                    </Text>
                  </View>
                </Card.Body>
              </Card>
              <WhiteSpace />
            </WingBlank>
          </View>
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default DashboardScreen;
