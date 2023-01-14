export function slashTrim(str?: string): string | undefined {
	if (!str) {
		return
	};

	console.log('func start');
	let res = str
	if (str[0] === '/') {
		console.log('del start');
		res = res.slice(1)
	}

	if (str[str.length - 1] === '/') {
		console.log('del end');
		res = res.slice(0, str.length - 2)
	}
	console.log('func end');
	return res
}