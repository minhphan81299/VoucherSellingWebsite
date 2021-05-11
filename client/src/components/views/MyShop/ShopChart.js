import React from 'react';
import { Line } from 'react-chartjs-2';
const data = {
	labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
	datasets: [
		{
			label: 'number of selling products',
			data: [12, 19, 3, 5, 2, 3],
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgba(255, 99, 132, 0.2)',
		},
	],
};

const options = {
	onClick: (e, element) => {
		console.log(e, element);
	},
	onHover: (e, element) => {
		console.log(e);
	},
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};
function ShopChart() {
	return (
		<div
			style={{
				width: '75%',
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				margin: 'auto',
			}}
		>
			<div className='header'>
				<h1 className='title'>My Shop</h1>
			</div>
			<Line data={data} options={options} ref={(r) => console.log(r)} />
		</div>
	);
}

export default ShopChart;
