import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../actions/postActions';
import store from './../store';

class Update extends Component {

  constructor() {
    super();
    this.state = {
	    id:'',
      title: '',
      image: '',
      description: '',
      price: 0,
    };
  }
  componentDidMount() {
    var loc = window.location.pathname;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");

    axios.get(`/api/post/${ind}`)
    .then(res => {
      this.setState({ id: res.data._id, title: res.data.title, image: res.data.image, description: res.data.description, price: res.data.price, });
    })
    .catch((error) => {
      console.log('error',error);
    });
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id,title, image, description,price } = this.state;
    var post={};
    post.title = title;
    post.image = image;
    post.description = description;
    post.price = price;
    this.props.updatePost(id,post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    this.props.history.push("/") 
  }

  render() {
    const { title, image, description,price } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Update Product
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Roduct List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="author">title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="title" />
              </div>
              <div class="form-group">
                <label for="author">image:</label>
                <input type="text" class="form-control" name="image" value={image} onChange={this.onChange} placeholder="image" />
              </div>
              <div class="form-group">
                <label for="author">price:</label>
                <input type="number" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="price" />
              </div>                            
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Update.propTypes = {
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { updatePost })(Update);