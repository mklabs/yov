
all: help

help:
	bake -h

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

build-app:
	browserify -e yov/app.js -r ./lib/view.js:yov > yov/bundle.js

build-lib:
	browserify -e lib/view.js -o yov/yov-0.0.1.js --standalone Yov

build: build-app build-lib commit

commit:
	git commit -am 'build update'

deploy: build push
	git subtree push --prefix yov origin gh-pages

push:
	git push origin master
