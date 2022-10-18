# What does it do

This is a simple ECMAScript module that allows you convert plain mediainfo text output into a JSON object for further processing. Some numeric values are converted to numbers (currently resolution and frame rate), others are left as strings.


# How to use it
Simply
```bash
npm install -P mediainfo-text2json
```
or
```bash
yarn add mediainfo-text2json
```
So you can
```javascript
import {default as t2j} from 'mediainfo-text2json';
t2j(mediaInfoText);
```

# Development
To run unit tests:
```
npm run test
```
Note: No third party test framework is used, just plain node.js, so `node >= 18` is required to run the tests.

