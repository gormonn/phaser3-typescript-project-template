const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');

const basePath = './dist/assets/img';
const output = fileName => (`./src/img/${fileName}`);

// const d = true;
const d = false;
const {keys, values} = readDir(basePath);

let TEMPLATE = `export default <%- JSON.stringify(content, null, 4).replace(/\"([^(\")"]+)\":/g,"$1:") %>;`;
let outputContent = ejs.render(TEMPLATE, {content: _.zipObjectDeep(keys, values)});
fs.writeFile(output('images.ts'), outputContent, {}, () => { console.log('object.ts done!') });

TEMPLATE = `export default {
    KEYS:   <%- JSON.stringify(keys, null, 4) %>,
    VALUES:     <%- JSON.stringify(values, null, 4) %>
}`;
outputContent = ejs.render(TEMPLATE, {keys, values});
fs.writeFile(output('images.flat.ts'), outputContent, {}, () => { console.log('object.flat.ts done!') });


function readDir(root, filter = noDotFiles, keys = [], values = [], prefix = '', prevPrefix = '', name = '', object = { keys:[], values:[] }) {
    const dir = path.join(root, prefix);
    if (!fs.existsSync(dir)) {
        return keys;
    }
    if (fs.statSync(dir).isDirectory()) {
        fs.readdirSync(dir)
            .filter(function (name, index) {
                return filter(name, index, dir)
            })
            .forEach(function (name) {
                readDir(root, filter, keys, values, path.join(prefix, name), prefix, name, object);
            })
    } else {
        let objectPath = prevPrefix.length > 0 ? 
            prevPrefix.toLocaleUpperCase().split('\\') : [];
        const fileName = name.split('.').slice(0, -1).join('.').toLocaleUpperCase();
        objectPath = [...objectPath, fileName];

        d?console.log({object1: object}):{};
        keys.push(objectPath.join('.'));
        values.push(prefix.split('\\').join('/'));
    }
    d?console.log({object2: object}):{};
    return {keys, values};
}
function noDotFiles(x) {
    return x[0] !== '.'
}
