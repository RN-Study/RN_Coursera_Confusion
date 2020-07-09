import * as ActionTypes from './ActionTypes';
import {baseURL} from '../shared/baseURL';
import {comments} from './comments';

export const fetchComments = () => (dispatch) => {
  return fetch(baseURL + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      },
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMessage) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMessage,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchDishes = () => (dispatch) => {
  return fetch(baseURL + 'dishes')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      },
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => {
  type: ActionTypes.DISHES_LOADING;
};

export const dishesFailed = (errMessage) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMessage,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchPromos = () => (dispatch) => {
  return fetch(baseURL + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      },
    )
    .then((response) => response.json())
    .then((promotions) => dispatch(addPromos(promotions)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => {
  type: ActionTypes.PROMOS_LOADING;
};

export const promosFailed = (errMessage) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMessage,
});

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions,
});

export const fetchLeaders = () => (dispatch) => {
  return fetch(baseURL + 'leaders')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      },
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => {
  type: ActionTypes.LEADERS_LOADING;
};

export const leadersFailed = (errMessage) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMessage,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});
