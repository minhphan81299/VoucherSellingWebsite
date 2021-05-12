import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function ShopChart(props) {
	const [dataShop, setDataShop] = useState([]);
	const options = {
		onClick: (e, element) => {
			if (element.length > 0) {
				const valueOb = { [e.chart.tooltip.dataPoints[0].label]: e.chart.tooltip.dataPoints[0].formattedValue };
				if (dataShop.map((e) => Object.keys(e)[0]).indexOf(Object.keys(valueOb)[0]) === -1) {
					setDataShop([valueOb, ...dataShop]);
				}
			}
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
	const data = {
		labels: props.dataTime?.map((e) => Object.keys(e)[0]),
		datasets: [
			{
				label: 'number of selling products',
				data: props.dataTime
					.map((e) => Object.values(e))
					.reduce((acc, cur) => {
						return [...acc, ...cur];
					}, []),
				fill: false,
				backgroundColor: 'rgb(0, 0, 0)',
				borderColor: 'rgb(0, 0, 0)',
			},
		],
	};
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
			<table className='table table-striped table-hover'>
				<thead>
					<tr>
						<th scope='col' style={{ fontSize: '23px' }}>
							Date
						</th>
						<th scope='col' style={{ fontSize: '23px' }}>
							Quantity
						</th>
					</tr>
				</thead>

				{dataShop?.length > 0
					? dataShop.map((e) => (
							<tbody>
								<tr className='table-light'>
									<td style={{ fontWeight: '500' }}>{Object.keys(e)}</td>
									<td style={{ fontWeight: '500' }}>{Object.values(e)}</td>
								</tr>
							</tbody>
					  ))
					: null}
			</table>
		</div>
	);
}

export default ShopChart;
