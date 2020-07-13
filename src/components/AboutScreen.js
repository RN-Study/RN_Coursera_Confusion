import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {HISTORY} from '../shared/history';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import Loading from './Loading';

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

const AboutScreen = (props) => {
  const [history] = useState(HISTORY);
  // const [leaders] = useState(LEADERS);

  const renderLeaderItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={
          <View>
            <Text style={{color: 'gray'}}>{item.description}</Text>
          </View>
        }
        leftAvatar={{source: {uri: baseURL + item.image}}}
      />
    );
  };
  const History = (props) => {
    return (
      <Card title={'Our History'}>
        <Text style={{}}> {history} </Text>
      </Card>
    );
  };
  if (props.leaders.isLoading) {
    return (
      <ScrollView>
        <History />
        <Card title={'Corporate Leadership'}>
          <Loading />
        </Card>
      </ScrollView>
    );
  } else if (props.leaders.errorMessage) {
    return (
      <ScrollView>
        <History />
        <Card title={'Corporate Leadership'}>
          <Text> {props.leaders.errorMessage} </Text>
        </Card>
      </ScrollView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <History />
        <Card containerStyle={{flex: 1}} title={'Corporate Leadership'}>
          <FlatList
            data={props.leaders.leaders}
            renderItem={renderLeaderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({});
export default connect(mapStateToProps)(AboutScreen);
