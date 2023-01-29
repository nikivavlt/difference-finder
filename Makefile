install: 
	npm ci
lint:
	npx eslint .
publish: 
	npm publish --dry-run
gendiff: 
	node bin/gendiff.js
tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest