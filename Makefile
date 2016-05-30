
all: serve

env:
	env

eslint:
	eslint .

fix:
	eslint . --fix

serve: watch

open:
	opn http://localhost:3000/yov/ -- google-chrome-stable

list:
	list yov/

dev:
	watchify yov/app.js -p [livereactload] -o yov/bundle.js &
	bake list

watch:
	watchify yov/app.js -p [livereactload] -o yov/bundle.js

build:
	browserify -e yov/app.js -o yov/bundle.js --standalone Yov

push: build
	git subtree push --prefix yov origin gh-pages
	git push origin master
