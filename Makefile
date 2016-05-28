
all: eslint budo open

eslint:
	DEBUG="eslint:cli*" eslint .

budo:
	budo docs/bundle.js -l -p 3000 --wg 'lib/* docs/*'

open:
	opn http://localhost:3000/test/ -- google-chrome-stable
