import React from 'react';
import Post from './Post'
import Container from 'react-bootstrap/Container'

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    }
    this.updatePosts = this.updatePosts.bind(this)
  }

  componentDidMount() {
    var backendHost = process.env.REACT_APP_BACKEND_HOST;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        backendHost = '';
    }
    fetch(`${backendHost}/posts`)
      .then(response => response.json())
      .then(data => this.updatePosts(data))
  }

  render() {
    return (
      <Container>
        {this.getPosts()}
      </Container>
    )
  }

  updatePosts(posts) {
    if (Array.isArray(posts)) {
      this.setState({
        posts: posts
      })
    }
  }

  getPosts() {
    if (this.state.posts == null) {
      return <div> waiting </div>
    } else {
      return this.state.posts.map((post) =>
        <Post title={post.title} content={post.content} timestamp={post.timestamp} key={post.timestamp}/>
      )
    }
  }
}

export default PostList