export interface LoaderOptions {
	size?: string;
	borderWidth?: string;
	movingColor?: color;
	backgroundColor?: color;
}

export type color =
	'white' |
	'primary' |
	'secondary' |
	'tertiary' |
	'success' |
	'info' |
	'warning' |
	'danger' |
	'light' |
	'dark';
