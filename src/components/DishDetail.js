import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import {postFavorite} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

export const RenderDish = (props) => {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{uri: baseURL + dish.image}}>
        <Text style={{margin: 10}}> {dish.description} </Text>
        <Icon
          raised={true}
          reverse={true}
          name={props.favorite ? 'heart' : 'heart-o'}
          type={'font-awesome'}
          color={'#f50'}
          onPress={() => {
            props.favorite ? console.log('Alread favorite') : props.onPress();
          }}
        />
      </Card>
    );
  } else {
    return <View />;
  }
};

export const RenderComments = (props) => {
  const comments = props.comments;
  const renderCommentItem = ({item, index}) => {
    return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}> {item.comment} </Text>
        <Text style={{fontSize: 12}}> {item.rating} Stars </Text>
        <Text style={{fontSize: 12}}>
          {'-- ' + item.author + ',' + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Card title={'Comments'}>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
};

const DishDetail = (props) => {
  // const [dishes] = useState(DISHES);
  // const [comments] = useState(COMMENTS);
  // const [favorites, setFavorites] = useState([]);
  const {dishId} = props.route.params;

  const markFavorite = (dishId) => {
    // setFavorites(favorites.concat(dishId));
    props.postFavorite(dishId);
  };

  return (
    // <ScrollView>
    <View>
      <RenderDish
        dish={props.dishes.dishes[+dishId]}
        favorite={props.favorites.some((el) => el === dishId)}
        onPress={() => markFavorite(dishId)}
      />
      <RenderComments
        comments={props.comments.comments.filter(
          (comment) => comment.dishId === dishId,
        )}
      />
    </View>
    // </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
