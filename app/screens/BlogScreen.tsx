/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useCallback, useContext} from 'react';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  RouteProp,
} from '@react-navigation/native';

import View from '@ant-design/react-native/lib/view';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import WingBlank from '@ant-design/react-native/lib/wing-blank';

import {ScreenContainer, SidebarContainer, Title} from './wrappers';
import {FlatList, SafeAreaView} from 'react-native';
import fetchWrapper from '../fetchWrapper';
import {MainMenu} from '../components/MainMenu';
import {ArticleItem} from '../components/ArticleItem';
import {StackParamList} from '../routes';
import {Context} from '../contextProvider';

type ArticleProps = {
  title: string;
  id: number;
  body: string;
};

type ArticleItem = {
  item: ArticleProps;
};

const BlogScreen: React.FC = function () {
  const [posts, setData] = useState();
  const randomUser = useContext(Context);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamList, 'Blog'>>();
  const {postId} = route?.params;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchPosts = async () => {
        await fetchWrapper(`/users/${randomUser}/posts/`, 'GET', null)
          .then(response => response?.json())
          .then(data => (isActive ? setData(data) : null));
      };
      fetchPosts();

      return () => {
        isActive = false;
      };
    }, [randomUser]),
  );

  const renderItem = ({item}: ArticleItem) => (
    <ArticleItem
      key={item.id}
      title={item.title}
      body={item.body}
      id={item.id}
      viewMode="list"
    />
  );

  return (
    <SafeAreaView>
      <ScreenContainer>
        <View style={{flexBasis: '35%'}}>
          <SidebarContainer>
            <MainMenu navigation={navigation} />
          </SidebarContainer>
        </View>
        <View style={{flexBasis: '65%'}}>
          <WingBlank size="lg" />
          <WhiteSpace />

          {postId ? (
            <>
              <Title>Single view</Title>
              <WhiteSpace />
              <ArticleItem id={postId} viewMode="view" title="" body="" />
            </>
          ) : (
            <>
              <Title>What's new</Title>
              <FlatList data={posts} renderItem={renderItem} />
            </>
          )}
          <WhiteSpace size="lg" />
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default BlogScreen;
