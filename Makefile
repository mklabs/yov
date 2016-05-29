
all: serve

eslint:
	DEBUG="eslint:cli*" eslint .

serve: watch

budo:
	budo -l -p 3000

open:
	opn http://localhost:3000/docs/ -- google-chrome-stable

list:
	list .

watch:
	watchify docs/app.js -p [livereactload] -o bundle.js &
	bake list
