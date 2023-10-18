import { useEffect, useState } from 'react';
import { Card, Container, Button, Col, Row } from 'react-bootstrap';
import image from '../../../assets/images/a.jpg';
import './instrutor.css';
import axiosInstance from '../../../AxiosEndPoint/axiosEnd';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface Instructor {
  _id: string;
  instrctorname: string;
}

const InstructorList: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    axiosInstance
      .get('/student/allTutors')
      .then((response) => {
        setInstructors(response.data.allInstrcutor);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  return (
    <div>
      <section className="instructor">
        <h1 className="text-center mt-5 card-head">Main INSTRUCTOR</h1>
        <Container className="mt-5">
          <Row className="ms-4">
            {instructors.slice(0, 3).map((instructor) => (
              <Col xs={12} md={4} className="instructor-card" key={instructor._id}>
                <Card className="ms-5" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={image} />
                  <Card.Body>
                    <Card.Title className="card-title text-center card-head">{instructor.instrctorname}</Card.Title>
                    <Link to={`/tutor_details/${instructor._id}`}>
                      <Button className="card-button ms-5">Go somewhere</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default InstructorList;
