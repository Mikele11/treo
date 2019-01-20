import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Derails extends Component {

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
      this.setState({ id: res.data._id, title: res.data.title, image: res.data.image, description: res.data.description, price: res.data.price });
    })
    .catch((error) => {
      console.log('error',error);
    });
  }

  render() {
    const { title, image, description,price } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Details Product
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Roduct List</Link></h4>
            <form>
              <div class="form-group">
                <label for="author">title:</label>
                <input type="text" class="form-control" name="title" value={title}  placeholder="title" readonly />
              </div>
              <div class="form-group">
                <label for="author">image:</label>
                <input type="text" class="form-control" name="image" value={image}  placeholder="image" readonly />
              </div>
              <div class="form-group">
                <label for="author">price:</label>
                <input type="number" class="form-control" name="price" value={price} placeholder="price" readonly />
              </div>                            
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" placeholder="Description" cols="80" rows="3" readonly>{description}</textArea>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { })(Derails);