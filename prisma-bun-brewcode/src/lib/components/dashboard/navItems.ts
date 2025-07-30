import { House, Coffee, ShoppingBag, Settings } from "lucide-svelte";

const navItems = [
    { href: '/dashboard', label: 'Home', Icon: House },
    { href: '/dashboard/coffee', label: 'Coffee', Icon: Coffee },
    { href: '/dashboard/cart', label: 'Orders', Icon: ShoppingBag },
    { href: '/dashboard/settings', label: 'Settings', Icon: Settings },
];

export default navItems