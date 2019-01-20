import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      items:[],
    };
  }
  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/post')
      .then(res => {
        this.setState({ 
          posts: res.data,
          items: res.data 
        });
        console.log('App posts', this.state.posts)
      })
      .catch((error) => {
          this.props.history.push("/login");      
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  onDelete(index){
		axios.delete('/api/post/'+ this.state.posts[index]._id)
			.then((result) => { 
        console.log('post deleted');
        axios.delete('/api/post/comment/'+ this.state.posts[index]._id)
        .then(res => {
          console.log('deleted comment',res);
        })
        .catch((error) => {
          console.log('error',error);
        });
				axios.get('/api/post')
					.then(res => {
						this.setState({ posts: res.data });
					})
					.catch((error) => {
						console.log('error',error);
					});
			});
  }

  filterList = (event) => {
    let updatedList = [];
    const {posts} = this.state
    updatedList = posts;
    updatedList = updatedList.filter(function(item){
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy = (key) => {
    let postsCopy = [...this.state.items];
    postsCopy.sort(this.compareBy(key));
    this.setState({items: postsCopy});
  }
  
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              LIST &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Product</Link></h4>
            <div>
              <input type="text" placeholder="Search" onChange={this.filterList}/>
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => this.sortBy('title')}>Title</th>
                      <th onClick={() => this.sortBy('image')}>image</th>
                      <th>description</th>
                      <th onClick={() => this.sortBy('price')}>price</th>
                      <th>action update</th>
                      <th>action delete</th>
                      <th>action details</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.items.map((post,index)  =>
                    <tr>
                      <th>{post.title}</th> 
                      <th>{post.image}</th> 
                      <th>{post.description}</th> 
                      <th>{post.price}</th> 
                      <th>
                        <button class="btn btn-warning"><Link to={`/update/${this.state.items[index]._id}`}>Update<i class="glyphicon glyphicon-edit"></i></Link></button>
                      </th>
                      <th>
                        <button class="btn btn-danger" onClick={this.onDelete.bind(this,index)}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button>
                      </th>
                      <th>
                        <button class="btn btn-primary"><Link to={`/details/${this.state.items[index]._id}`}>details<i class="glyphicon glyphicon-edit"></i></Link></button>
                      </th>                      
                    </tr>
                  )}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
