export function slashTrim(str: string): string {
	console.log('func start');
	let res = str
	if (str[0] === '/') {
		console.log('del start');
		res = res.slice(1)
	}

	if (str[str.length - 1] === '/') {
		console.log('del end');
		res = res.slice(str.length - 1)
	}
	console.log('func end');
	return res
}