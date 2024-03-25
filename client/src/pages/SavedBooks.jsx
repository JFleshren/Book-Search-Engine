import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return;
      }

      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!Object.keys(userData).length) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container fluid>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col key={book.bookId} md="4">
              <Card border="dark">
                {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
