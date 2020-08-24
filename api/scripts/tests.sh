# mocha -r ts-node/register --timeout 999999 --colors --exit src/spec/**/*.spec.ts

tsc -p ./tsconfig.spec.json

cp package.json spec-lib/
cp package-lock.json spec-lib/

npm i --prefix spec-lib

mocha --timeout 999999  --exit --colors spec-lib/spec/**/*.spec.js