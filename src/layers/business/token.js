module.exports.newToken = tokens => {
	let tok;
	do{
		tok = '';
		[1,2,3,4].forEach(() => {
			tok += Math.floor(Math.random() * 100000).toString(16);
		})
	}while(tok in tokens)
	
	return tok;
}
