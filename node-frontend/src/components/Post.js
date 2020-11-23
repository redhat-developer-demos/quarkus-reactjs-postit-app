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
      id: this.props.id,
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
            {this.state.title}
          </Col>
        </Row>
        <Row className="post-content">
          <Col>
            <ReactMarkdown source={this.state.content}/>
          </Col>
        </Row>
        <Row className="post-footer justify-content-between">
          <Col className="post-time">
            {this.getDate(this.state.timestamp)}
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
    fetch('posts', {
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