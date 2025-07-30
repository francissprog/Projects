export const getUserTheme = (): boolean =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const iconSize = (isDarkMode: boolean): string => {
	return `h-10 w-10 ${
		isDarkMode
			? 'bg-subDark hover:bg-light hover:text-dark'
			: 'bg-subLight hover:bg-dark hover:text-light'
	} rounded-full p-3 transition-colors`;
};

// style utils
