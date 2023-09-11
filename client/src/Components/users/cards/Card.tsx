import React, { useEffect, useState } from "react";
import { Card, Container, Button, Col, Row } from "react-bootstrap";
import "./cards.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cards() {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/student/allCourses")
      .then((response) => {
        setCourse(response.data.allCourse);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  }, []);

  return (
    <section>
      <h1 className="text-center mt-5 card-head">Trending Course</h1>
      <Link to={'/courses'}style={{ textDecoration: 'none' }} >
      <Container className="mt-5">
      
        <Row className="ms-5">
        
          {course.slice(0,3).map((courseItem) => ( // Use curly braces here
            <Col xs={12} md={4} key={courseItem.id}> {/* Add a unique key for each course */}
              <Card style={{ width: "18rem",  }}>
                <Card.Img
                  variant="top"
                  src={`${baseUrl}/${courseItem.photo}`} style={{height:"200px"}}
                />
                <Card.Body>
                  <Card.Title className="card-title text-center">
                    {courseItem.coursename}
                  </Card.Title>
                  <Card.Text>{courseItem.coursedescrption}llll</Card.Text>
                  <Button className="card-button ms-5">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
         
        </Row>
        
      </Container>
      </Link>
    </section>
  );
}

export default Cards;
