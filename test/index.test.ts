import { prpx } from '../src';
import { expect, test, jest } from '@jest/globals';

test('combine classes', () => {
	expect(
		prpx(
			{
				className: 'text-white bg-black',
			},
			{
				className: 'font-medium text-white',
			}
		)
	).toStrictEqual({
		className: 'bg-black font-medium text-white',
	});
});

test('combine tailwind classes', () => {
	expect(
		prpx(
			{
				className: 'px-2 py-1 bg-red hover:bg-dark-red',
			},
			{
				className: 'p-3 bg-[#B91C1C]',
			}
		)
	).toStrictEqual({
		className: 'hover:bg-dark-red p-3 bg-[#B91C1C]',
	});
});

test('combine styles', () => {
	expect(
		prpx(
			{
				style: { color: 'white', backgroundColor: 'black' },
			},
			{
				style: { fontWeight: 'medium' },
			}
		)
	).toStrictEqual({
		style: { color: 'white', backgroundColor: 'black', fontWeight: 'medium' },
	});
});

test('combine event handlers', () => {
	const onClick1 = jest.fn();
	const onClick2 = jest.fn();

	const { onClick } = prpx(
		{
			onClick: onClick1,
		},
		{
			onClick: onClick2,
		}
	);

	onClick();

	expect(onClick1).toHaveBeenCalledTimes(1);
	expect(onClick2).toHaveBeenCalledTimes(1);
});
