# mocha -r ts-node/register --timeout 999999 --colors --exit src/spec/**/*.spec.ts

rm -rf spec-lib
mkdir spec-lib

cp package.json spec-lib/
cp package-lock.json spec-lib/
npm i --prefix spec-lib

tsc -p ./tsconfig.spec.json

mocha --timeout 999999  --exit --colors spec-lib/spec/**/*.spec.js