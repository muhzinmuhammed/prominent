import React, { useEffect, useRef, useState } from 'react';
import './certificate.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../AxiosEndPoint/axiosEnd';


const Certificate = () => {
  const { id } = useParams();
  const [entrolled, setEnrolled] = useState([]);


  useEffect(() => {
    axiosInstance
      .get(`/student/entrolledcourseDetails/${id}`)
      .then((response) => {
        console.log(response.data, 'lll');
        setEnrolled(response.data.entrolled);
      });
  }, [id]);



  return (
    <>
    <div className="container">

  
      <div className="certificate-container">
        <div className="certificate">
          <div className="water-mark-overlay"></div>
          <div className="certificate-header">
            <h1 className="text-center">Prominent</h1>
          </div>
          {entrolled.map((enrolled, index) => (
            <div key={index} className="certificate-body">
              <p className="certificate-title">
                Certificate of Completion of
              </p>
              <h1>{enrolled.courseId.coursename}</h1>
              <p className="student-name">Student Name:{enrolled.studentId.studentname}</p>
              <div className="certificate-content">
                <div className="about-certificate"></div>
                <p className="topic-title">
                  The Topic consists of {enrolled.continuityHours} Continuity hours and includes the following:
                </p>
                <div className="text-center">
                  <p className="topic-description text-muted">{enrolled.topicDescription}</p>
                </div>
              </div>
              <div className="certificate-footer text-muted">
                <div className="row">
                  <div className="col-md-6">
                    <p>Instructor:{enrolled.instructorId.instrctorname}</p>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <p>Accredited by :Prominent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Certificate;
