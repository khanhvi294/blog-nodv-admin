const cutStringFromWord = (string, startWord, endWord = '') => {
	const start = string.indexOf(startWord);
	const end = string.indexOf(endWord);
	return string.slice(start, end);
};

export default cutStringFromWord;
