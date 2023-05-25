import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import {
	getOverview,
	getOverviewPosts,
	getOverviewReportings,
	getOverviewUsers,
} from '../../api/adminApi';
import { useQuery, useQueryClient } from 'react-query';

import { Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../routers/AppRoutes';
import { handleDataOverview } from '../../utils/handleDataOverview';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Line Chart',
		},
	},
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

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
	const queryClient = useQueryClient();
	const [labels, setLabels] = useState(null);
	const [dataPostsChart, setDataPostsChart] = useState([]);
	const [dataUsersChart, setDataUsersChart] = useState([]);
	const [dataReportingsChart, setDataReportingsChart] = useState([]);

	const { loading, data: dataOverview } = useQuery('overview', getOverview, {
		onSuccess: () => {},
		onError: (err) => {
			console.log('err  ', err);
		},
	});

	useQuery(['overViewReportings'], getOverviewReportings, {
		onSuccess: (data) => {
			let res = handleDataOverview(data);
			queryClient.setQueryData(['overviewUsers'], res);

			let dataTotal = res.reduce(
				(accumulator, currentVal) => [
					...accumulator,
					currentVal?.total,
				],
				[],
			);

			setDataReportingsChart({
				label: 'Reportings',
				data: dataTotal,
				borderColor: '#27ae60',
				backgroundColor: '#2ecc71',
			});
		},
	});

	useQuery(['overviewUsers'], getOverviewUsers, {
		onSuccess: (data) => {
			let res = handleDataOverview(data);
			queryClient.setQueryData(['overviewUsers'], res);

			let dataTotal = res.reduce(
				(accumulator, currentVal) => [
					...accumulator,
					currentVal?.total,
				],
				[],
			);

			setDataUsersChart({
				label: 'Users',
				data: dataTotal,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			});
		},
	});

	useQuery(['overviewPosts'], getOverviewPosts, {
		onSuccess: (data) => {
			let res = handleDataOverview(data);
			queryClient.setQueryData(['overviewPosts'], res);
			let labels = res.reduce(
				(accumulator, currentVal) => [
					...accumulator,
					currentVal?.month,
				],
				[],
			);
			let dataTotal = res.reduce(
				(accumulator, currentVal) => [
					...accumulator,
					currentVal?.total,
				],
				[],
			);

			setLabels(labels);
			setDataPostsChart({
				label: 'Posts',
				data: dataTotal,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			});
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
								<ItemBox backgroundColor="bg-teal-300">
									<p>{dataOverview?.users} Users</p>
								</ItemBox>
							</Link>
						</Grid>
						<Grid item xs={6} md={2} className="">
							<Link to={appRoutes.POST}>
								<ItemBox backgroundColor="bg-red-300">
									<p>{dataOverview?.posts} Posts</p>
								</ItemBox>
							</Link>
						</Grid>
						<Grid item xs={6} md={2} className="">
							<Link to={appRoutes.REPORT}>
								<ItemBox backgroundColor="bg-green-300">
									<p>{dataOverview?.reportings} Reportings</p>
								</ItemBox>
							</Link>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						style={{ marginTop: '1.6rem' }}
						className="flex justify-center"
					>
						<Grid item xs={12} md={7}>
							{labels && (
								<Line
									options={options}
									data={{
										labels,
										datasets: [
											dataPostsChart,
											dataUsersChart,
											dataReportingsChart,
										],
									}}
								/>
							)}
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default HomePage;
