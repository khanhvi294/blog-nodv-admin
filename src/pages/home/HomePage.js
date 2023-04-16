import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import React from "react";
import { getOverview } from "../../api/adminApi";
import { Link } from "react-router-dom";
import { appRoutes } from "../../routers/AppRoutes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const ItemBox = ({ children, backgroundColor }) => {
  return (
    <div
      className={`${backgroundColor} h-[120px] hover:cusor-pointer text-center shadow-lg rounded-lg flex items-center justify-center`}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  const { loading, data: dataOverview } = useQuery("overview", getOverview, {
    onSuccess: () => {},
    onError: (err) => {
      console.log("err  ", err);
    },
  });
  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <div className="p-4">
          <Grid container spacing={2}>
            <Grid item xs={6} md={2} className="">
              <Link to={appRoutes.USER}>
                <ItemBox backgroundColor="bg-red-300">
                  <p>{dataOverview?.users} Users</p>
                </ItemBox>
              </Link>
            </Grid>
            <Grid item xs={6} md={2} className="">
              <Link to={appRoutes.POST}>
                <ItemBox backgroundColor="bg-green-300">
                  <p>{dataOverview?.posts} Posts</p>
                </ItemBox>
              </Link>
            </Grid>
            <Grid item xs={6} md={2} className="">
              <Link to={appRoutes.REPORT}>
                <ItemBox backgroundColor="bg-teal-300">
                  <p>{dataOverview?.reportings} Reportings</p>
                </ItemBox>
              </Link>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Line options={options} data={data} />;
          </Grid>
        </div>
      )}
    </>
  );
};

export default HomePage;
