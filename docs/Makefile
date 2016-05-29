
all: serve

eslint:
	DEBUG="eslint:cli*" eslint .

serve: watch

open:
	opn http://localhost:3000/docs/ -- google-chrome-stable

list:
	list .

watch:
	watchify app.js -p [livereactload] -o bundle.js &
	bake list
