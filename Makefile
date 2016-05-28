
all: eslint budo open

eslint:
	DEBUG="eslint:cli*" eslint .

budo:
	budo bundle.js -l -p 3000 --wg *.js

open:
	opn http://localhost:3000 -- google-chrome-stable
