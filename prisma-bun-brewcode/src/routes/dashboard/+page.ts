// images
import espresso from '../../images/espresso.png';
import americano from '../../images/americano.png';
import latte from '../../images/latte.png';
import cappuccino from '../../images/cappuccino.png';
import macchiato from '../../images/macchiato.png';
import mocha from '../../images/mocha.png';
import flatWhite from '../../images/flatWhite.png';
import ristretto from '../../images/ristretto.png';
import affogato from '../../images/affogato.png';
import irishCoffee from '../../images/irishCoffee.png';
import cortado from '../../images/cortado.png';
import redEye from '../../images/redEye.png';
import type { PageLoad } from './$types';
// svelte

export interface Coffee {
	id: number;
	name: string;
	description: string;
	price: number;
	sizes: string[];
	image: string;
	quantity: number ;
}	

const coffeeData: Coffee[] = [
	{
		id: 1,
		name: 'Espresso',
		description: 'A strong, concentrated coffee shot with a rich flavor.',
		price: 140, // 140 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: espresso,
		quantity: 0
	},
	{
		id: 2,
		name: 'Americano',
		description: 'Espresso diluted with hot water for a smooth, long coffee.',
		price: 168, // 168 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: americano,
		quantity: 0
	},
	{
		id: 3,
		name: 'Latte',
		description: 'Espresso with steamed milk and a thin layer of foam.',
		price: 196, // 196 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: latte,
		quantity: 0
	},
	{
		id: 4,
		name: 'Cappuccino',
		description: 'A balanced blend of espresso, steamed milk, and milk foam.',
		price: 196, // 196 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: cappuccino,
		quantity: 0
	},
	{
		id: 5,
		name: 'Macchiato',
		description: 'Espresso topped with a small amount of milk or foam.',
		price: 156, // 156.8 PHP
		sizes: ['Single', 'Double'],
		image: macchiato,
		quantity: 0
	},
	{
		id: 6,
		name: 'Mocha',
		description: 'A delightful mix of espresso, chocolate, and steamed milk.',
		price: 224, // 224 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: mocha,
		quantity: 0
	},
	{
		id: 7,
		name: 'Flat White',
		description: 'Espresso with a velvety microfoam, similar to a latte but creamier.',
		price: 180, // 180 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: flatWhite,
		quantity: 0
	},
	{
		id: 8,
		name: 'Ristretto',
		description: 'A shorter, more concentrated shot of espresso with a bold flavor.',
		price: 140, // 140 PHP
		sizes: ['Single', 'Double'],
		image: ristretto,
		quantity: 0
	},
	{
		id: 9,
		name: 'Affogato',
		description: 'A scoop of vanilla ice cream topped with a shot of hot espresso.',
		price: 200, // 200 PHP
		sizes: ['Single Serving'],
		image: affogato,
		quantity: 0
	},
	{
		id: 10,
		name: 'Irish Coffee',
		description: 'Hot coffee combined with Irish whiskey, sugar, and topped with cream.',
		price: 300, // 300 PHP
		sizes: ['Single Serving'],
		image: irishCoffee,
		quantity: 0
	},
	{
		id: 11,
		name: 'Cortado',
		description: 'Espresso mixed with an equal amount of steamed milk.',
		price: 170, // 170 PHP
		sizes: ['Single', 'Double'],
		image: cortado,
		quantity: 0
	},
	{
		id: 12,
		name: 'Red Eye',
		description: 'A brewed coffee with a shot of espresso for extra kick.',
		price: 190, // 190 PHP
		sizes: ['Small', 'Medium', 'Large'],
		image: redEye,
		quantity: 0
	}
];

// load the data
export const load: PageLoad = () => {
	return {
		coffeeData
	};
};
