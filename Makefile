install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
start:
	npx babel-node src/bin/gendiff.js ~/before.json ~/after.json