import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {ListItem, Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import Loading from './Loading';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const Menu = (props) => {
  // const [dishes] = useState(DISHES);

  const {navigate} = props.navigation;

  const renderMenuItem = ({item, index}) => {
    return (
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        // chevron={true}
        featured={true}
        imageSrc={{uri: baseURL + item.image}}
        onPress={() => navigate('DishDetail', {dishId: item.id})}
      />
    );
  };

  if (props.dishes.isLoading) {
    return <Loading />;
  } else if (props.dishes.errorMessage) {
    return (
      <View>
        <Text>{props.dishes.errorMessage}</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
};

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(Menu);
