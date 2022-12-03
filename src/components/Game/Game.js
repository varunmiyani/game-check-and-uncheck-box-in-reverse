import React, { useCallback, useEffect, useState } from 'react';
import Box from '../Box';
import Tracker from '../Tracker';
import * as CONST from './const';
import './Game.css';

var stackInterval;
const Game = props => {
	const [stack, setStack] = useState([]);
	const [isReverseModeOn, setReverseModeOn] = useState(false);

	const onClickBox = code => {
		if (!code || stack.includes(code) || isReverseModeOn) return;
		const newstack = [...stack];
		newstack.push(code);
		setStack(newstack);
	};

	const clearStack = useCallback(() => {
		setStack(prevStack => {
			const newStack = [...(prevStack || [])];
			newStack.pop();
			return newStack;
		});
	}, []);

	useEffect(() => {
		if (!isReverseModeOn) return;
		stackInterval = setInterval(clearStack, 1000);
		return () => clearInterval(stackInterval);
		// eslint-next-line-disable
	}, [isReverseModeOn, clearStack]);

	useEffect(() => {
		if (stack.length >= 7) {
			setTimeout(() => {
				setReverseModeOn(true);
			}, 1000);
		}
		if (stack.length <= 0) {
			setReverseModeOn(false);
			clearInterval(stackInterval);
		}
	}, [stack]);

	// console.log('Game-', { stackInterval, stack, isReverseModeOn });

	return (
		<div
			className='GameWrapper'
			onClick={e => {
				if (isReverseModeOn) {
					e.preventDefault();
					e.stopPropagation();
				}
			}}>
			{
				<h1>
					{isReverseModeOn ? (
						<span>😃 ENJOY THE SHOW 😃</span>
					) : (
						<span>Please Select All Square To See Magic</span>
					)}
				</h1>
			}
			<Tracker name='Assending' stack={stack} />
			<div className='GameBox'>
				{CONST.SHAPE_CODE.map((code, codeIndex) => {
					return (
						<Box
							key={`${codeIndex}${code}`}
							isActive={stack?.includes(code)}
							code={code}
							id={code}
							isReverseModeOn={isReverseModeOn}
							onClick={onClickBox}
						/>
					);
				})}
			</div>
			<Tracker name='Decending' stack={stack} />
		</div>
	);
};

export default Game;
