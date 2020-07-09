import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, SafeAreaView} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {HISTORY} from '../shared/history';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Card title={'Our History'}>
        <Text style={{}}> {history} </Text>
      </Card>

      <Card containerStyle={{flex: 1}} title={'Corporate Leadership'}>
        <FlatList
          data={props.leaders}
          renderItem={renderLeaderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default connect(mapStateToProps)(AboutScreen);
