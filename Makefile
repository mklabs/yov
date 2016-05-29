
all: serve

eslint:
	DEBUG="eslint:cli*" eslint .

serve: watch

open:
	opn http://localhost:3000/docs/ -- google-chrome-stable

list:
	list .

watch:
	watchify docs/app.js -p [livereactload] -o docs/bundle.js &
	bake list

bro:
	browserify docs/app.js -o docs/bundle.js
