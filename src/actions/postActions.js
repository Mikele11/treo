import {  NEW_POST, UPDATE_POST } from '../actions/types'
import axios from 'axios';

export const createPost = (postData) => dispatch => {
  return axios.post(`/api/post`,postData)
    .then((res) =>{
      console.log('new_post',res)
        dispatch({
          type: NEW_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      this.props.history.push("/")
      console.log('action err',err)
  });
};

export const updatePost = (id,postData) => dispatch => {
  return axios.put(`/api/post/${id}`,postData)
    .then((res) =>{
      console.log('update_post',res)
        dispatch({
          type: UPDATE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      console.log('action err',err)
  });
};

