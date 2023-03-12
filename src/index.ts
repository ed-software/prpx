import { mergeRefs } from 'react-merge-refs';
import { twMerge } from 'tailwind-merge';
import type { Falsey, Spread } from './types';
import { isKeyValid } from './utils';

/** Function that merges multiple props objects together.
 *
 *  Merges tailwind classes using tailwind-merge. Merges styles. Merges event handlers.
 */
export function prpx<T extends Array<object | Falsey>>(...allProps: T) {
	const truthyProps = allProps.filter(Boolean) as Array<object>;
	/** Merge props objects */
	const props: Spread<T> = Object.assign({}, ...truthyProps);

	/** Merge class names */
	if (isKeyValid(props, 'className', 'string')) {
		const classNames = truthyProps.reduce(
			(prev, curr) =>
				isKeyValid(curr, 'className', 'string') ? twMerge(prev, curr.className) : prev,
			''
		);

		/** Remove duplicate class names */
		const uniqueClassNames = [...new Set(classNames.split(' '))].join(' ');

		props.className = uniqueClassNames;
	}

	/** Merge styles */
	if (isKeyValid(props, 'style', 'object')) {
		props.style = Object.assign(
			{},
			...allProps.map((p) => (isKeyValid(p, 'style', 'object') ? p.style : {}))
		);
	}

	/** Merge event handlers */
	for (const prop in props) {
		if (prop.startsWith('on') && isKeyValid(props, prop, 'function')) {
			(props as any)[prop] = allProps.reduce(
				(prev, curr) => (e?: Event) => {
					typeof prev === 'function' && prev(e);
					if (isKeyValid(curr, prop, 'function')) {
						const fn = curr[prop];
						typeof fn === 'function' && fn(e);
					}
				},
				(e?: Event) => {}
			);
		}
	}

	/** Merge refs */
	if (isKeyValid(props, 'ref', 'object') || isKeyValid(props, 'ref', 'function')) {
		props.ref = mergeRefs(
			allProps
				.map((p) =>
					isKeyValid(p, 'ref', 'object') || isKeyValid(p, 'ref', 'function') ? p.ref : undefined
				)
				.filter(Boolean)
		);
	}

	return props;
}
