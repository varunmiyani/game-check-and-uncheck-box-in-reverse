import React from 'react';
const Tracker = props => {
	const { stack, name } = props;

	if (name === 'Assending')
		return (
			<div className='Tracker'>
				<h4>{name}</h4>
				<ul>
					{Array(7)
						.fill(0)
						.map((a, index) => {
							return (
								<li key={`${a}${index}`}>
									<div>{index + 1}</div>
									<div>{stack?.[index] || ''}</div>
								</li>
							);
						})}
				</ul>
			</div>
		);
	// Desending
	let maxLength = 8;
	return (
		<div className='Tracker'>
			<h4>{name}</h4>
			<ul>
				{Array(7)
					.fill(0)
					.map((a, index) => {
						maxLength = maxLength - 1;
						return (
							<li key={`${a}${index}`}>
								<div>{maxLength}</div>
								<div>{stack?.[maxLength - 1] || ''}</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default Tracker;
