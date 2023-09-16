import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CourseDetails from "./CourseDetails";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";

const public_key = "your_stripe_public_key"; // Replace with your Stripe public key
const stripePromise = loadStripe(public_key);

const CourseBuying = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makePaymentRequest = async () => {
      try {
        const response = await axiosInstance.post("/student/create-payment", {});
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    makePaymentRequest();
  }, []);

  return (
    <div>
     
    </div>
  );
};

export default CourseBuying;
