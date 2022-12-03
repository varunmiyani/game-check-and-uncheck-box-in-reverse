import React from 'react';

const Box = props => {
	const { isActive, code, onClick, isReverseModeOn } = props;
	if (!code) return <div className='BoxPlaceholder' />;
	return (
		<div
			className='Box'
			style={{
				backgroundColor: isActive ? 'green' : 'white',
				color: isActive ? 'white' : 'green',
			}}
			onClick={e => {
				if (isReverseModeOn) {
					e.preventDefault();
					e.stopPropagation();
					return;
				}
				onClick(code);
			}}>
			{code}
		</div>
	);
};

export default Box;
