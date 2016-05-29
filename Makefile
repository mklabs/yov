
all: serve

eslint:
	DEBUG="eslint:cli*" eslint .

serve: watch

open:
	opn http://localhost:3000/docs/ -- google-chrome-stable

list:
	list docs/

watch:
	watchify docs/app.js -p [livereactload] -o docs/bundle.js &
	bake list

ghpages:
	git subtree push --prefix docs origin gh-pages
