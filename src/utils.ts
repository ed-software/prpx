import { PrimaryValType } from './types';

export function keyInObject(object: object, key: string): key is keyof typeof object {
	return key in object;
}

/**
 * Checks if a key is valid for an object. Returns true if the key exists and the value is of the specified type.
 */
export function isKeyValid<TKey extends string, TKeyType extends keyof PrimaryValType>(
	object: unknown,
	key: TKey,
	keyType: TKeyType
): object is Record<TKey, PrimaryValType[TKeyType]> & object {
	return (
		!!object &&
		typeof object === 'object' &&
		keyInObject(object, key) &&
		typeof object[key] === keyType
	);
}
