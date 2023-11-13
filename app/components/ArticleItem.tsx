/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Card from '@ant-design/react-native/lib/card';
import View from '@ant-design/react-native/lib/view';
import Button from '@ant-design/react-native/lib/button';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import {StackParamList} from '../routes';
import {ArticleContainer} from '../screens/wrappers';
import fetchWrapper from '../fetchWrapper';

type ArticleItemType = {
  title: string;
  body: string;
  id: number;
  viewMode: 'update' | 'view' | 'list';
};

export const ArticleItem = ({
  id: postId,
  title,
  body,
  viewMode,
}: ArticleItemType) => {
  const navigation = useNavigation();

  const [mode, setMode] = useState(viewMode);
  const {params} = useRoute<RouteProp<StackParamList, 'Blog'>>();
  const title2Edit = params.title;
  const body2Edit = params.body;

  const [newTitle, onChangeNewTitle] = useState<string | undefined>(title2Edit);
  const [newBody, onChangeNewBody] = useState<string | undefined>(body2Edit);

  const updateContent = async (
    newT: string | undefined,
    newB: string | undefined,
  ) => {
    await fetchWrapper(`posts/${postId}`, 'PUT', {title: newT, body: newB});
  };

  if (mode === 'view' || mode === 'update') {
    return (
      <>
        <Card>
          {mode === 'update' ? (
            <TextInput
              multiline
              value={newTitle}
              autoFocus
              onChangeText={text => onChangeNewTitle(text)}
              style={{fontSize: 18, marginLeft: '3%', marginRight: '3%'}}
            />
          ) : (
            <Card.Header title={title2Edit} style={{}} />
          )}
          <Card.Body>
            <View style={{height: 'auto', marginLeft: 12}}>
              {mode === 'update' ? (
                <TextInput
                  multiline
                  value={newBody}
                  textAlign="left"
                  onChangeText={text => onChangeNewBody(text)}
                  style={{fontSize: 18, marginLeft: '1%', marginRight: '1%'}}
                />
              ) : (
                <Text style={{lineHeight: 22, fontSize: 16}}>{body2Edit}</Text>
              )}
            </View>
          </Card.Body>
        </Card>
        <WhiteSpace />
        <View>
          {mode === 'view' ? (
            <>
              <Button onPress={() => setMode('update')}>Update</Button>
              <WhiteSpace />
              <Button
                onPress={() =>
                  navigation.navigate('Blog', {postId: undefined})
                }>
                Go back
              </Button>
            </>
          ) : (
            <>
              <Button onPress={() => updateContent(newTitle, newBody)}>
                Save
              </Button>
              <WhiteSpace />
              <Button onPress={() => setMode('view')}>Cancel</Button>
            </>
          )}
        </View>
      </>
    );
  }

  return (
    <>
      <ArticleContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate('Blog', {postId, title, body})}>
          <Card>
            <Card.Header title={title} style={{}} />
            <Card.Body>
              <View style={{height: 'auto', marginLeft: 12}}>
                <Text style={{lineHeight: 22, fontSize: 16}}>{body}</Text>
              </View>
            </Card.Body>
          </Card>
        </TouchableOpacity>
      </ArticleContainer>
    </>
  );
};
