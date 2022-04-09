import React, { useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Tooltip from 'react-bootstrap/Tooltip';
import addIcon from '../assets/plus-circle-fill.svg';
import AddPostModal from '../components/posts/AddPostModal';
import SinglePost from '../components/posts/SinglePost';
import UpdatePostModal from '../components/posts/UpdatePostModal';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from './../contexts/PostContext';

function DashBoard() {
  const {
    postState: { posts, postLoading, post },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  useEffect(() => getPosts(), []);
  let body;
  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>Click the button below to track your first skill to learn</Card.Text>
            <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col className="my-2" key={post._id}>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open add post modal */}
        <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
          <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
            <img src={addIcon} alt="add" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '10%', right: '10px' }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, { show: false, message: '', type: null })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default DashBoard;
