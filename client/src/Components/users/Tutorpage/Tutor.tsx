import React, { useEffect, useState } from "react";
import image from "../../../assets/images/a.jpg";
import "./Tutor.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Instructor {
  _id: string;
  instrctorname: string;
  // Add other properties as needed
}

const TutorComponent: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    axiosInstance.get('/student/allTutors')
      .then((response) => {
        setInstructors(response.data.allInstrcutor);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  return (
    <>
      <div className="tutor-header">
        <h1 className="text-center tutor-header-first">Our Instructors</h1>
        <h5 className="text-center tutor-header-second">
          Meet Tutor Trek Subject Experts
        </h5>
      </div>

      <section className="course-card">
        <div className="container">
          <div className="row ms-5 mt-5">
            {instructors.map((instructor) => (
              <div className="col-lg-4" key={instructor._id}>
                <div className="card-border card" style={{ width: "18rem", height: "20rem" }}>
                  <img
                    className="card-img-top"
                    src={image}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <Link to={`/tutor_details/${instructor._id}`}>
                      <h5 className="card-title text-center">{instructor.instrctorname}</h5>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TutorComponent;
