import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
      timestamp: this.props.timestamp,
    }
    this.deletePost = this.deletePost.bind(this);
  }

  render() {
    return (
      <Container className="post">
        <Row className="post-title">
          <Col>
            {this.props.title}
          </Col>
        </Row>
        <Row className="post-content">
          <Col>
            <ReactMarkdown source={this.props.content}/>
          </Col>
        </Row>
        <Row className="post-footer justify-content-between">
          <Col className="post-time">
            {this.getDate(this.props.timestamp)}
          </Col>
          <Col className="delete-post-button" sm={1}>
            <Button variant="danger" type="submit" onClick={this.deletePost}>
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
  getDate(epoch) {
    var d = new Date(epoch);
    return "Posted at " + d.toLocaleTimeString() + " on " + d.toLocaleDateString()
  }

  deletePost() {
    var backendHost = process.env.REACT_APP_BACKEND_HOST;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        backendHost = '';
    }
    fetch(`${backendHost}/posts`, {
      method: 'DELETE',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    window.location.reload();
  }

}

export default Post