import React, { useEffect, useState } from "react";
import Nav from "./Header/Nav";
import { ToastContainer } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import adminInstance from "../../AxiosEndPoint/adminInstance";
import { toast } from "react-toastify";

interface Counts {
  tot: number;
  totalUsersCount: number;
  totalOrderCount: number;
  InsructorCount: number;
  CourseCount: number;
}

interface MonthlySale {
  _id: number;
  total: number;
}

const Dashboard: React.FC<{ Toggle: () => void }> = ({ Toggle }) => {
  const [counts, setCounts] = useState<Counts>({
    tot: 0,
    totalUsersCount: 0,
    totalOrderCount: 0,
    InsructorCount: 0,
    CourseCount: 0,
  });

  const [monthlySales, setMonthlySales] = useState<MonthlySale[]>([]);

  useEffect(() => {
    adminInstance
      .get("/admin/total_count")
      .then((response) => {
        console.log(response.data);
        setCounts(response.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  useEffect(() => {
    adminInstance.get('/admin/sales_report')
      .then((response) => {
        // Initialize an array with data for every month
        const currentMonth = new Date().getMonth() + 1;
        const initialMonthlySales = Array.from({ length: 12 }, (_, index) => {
          const month = ((currentMonth + index - 1) % 12) + 1; // Ensure January is the first month
          return { _id: month, total: 0 };
        });

        // Update the initial array with the fetched data
        const updatedMonthlySales = initialMonthlySales.map((item) => {
          const matchingData = response.data.find((data: { _id: number; }) => data._id === item._id);
          return matchingData || item;
        });

        // Sort the data by month
        updatedMonthlySales.sort((a, b) => a._id - b._id);

        setMonthlySales(updatedMonthlySales);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="px-3 bg-white">
      <ToastContainer />
      <Nav Toggle={Toggle} />
      <h1>Admin DashBoard</h1>

      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text">{counts.tot}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{counts.totalUsersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text">{counts.totalOrderCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Insructor Count</h5>
              <p className="card-text">{counts.InsructorCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Course Count</h5>
              <p className="card-text">{counts.CourseCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlySales}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tickFormatter={(month) =>
                new Date(0, month - 1, 1).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Monthly Sales" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
