import { computed, map } from 'nanostores';
import type { CartItem, ShopItem } from '../types';

export const $cart = map<Record<number, CartItem>>({});

export function addItemToCart(item: ShopItem) {
	const cartItem = $cart.get()[item.id];
	const quantity = cartItem ? cartItem.quantity : 0;

	$cart.setKey(item.id, {
		item,
		quantity: quantity + 1,
	});
}

export function removeItemFromCart(itemId: number) {
	// @ts-ignore
	$cart.setKey(itemId, undefined);
}

export const subtotal = computed($cart, (entries) => {
	let subtotal = 0;

	Object.values(entries).forEach((item) => {
		if (!item) return;

		subtotal += item.quantity * item.item.price;
	});

	return subtotal;
});
