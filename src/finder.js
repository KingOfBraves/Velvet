import fs from 'fs';
import path from 'path';

const testFolder = '__tests__';

const fileContainer = [];

const addToContainer = (newFile) => {
    fileContainer.push('../' + newFile); //its adding src to the beginning, need to go up one
}

const fromDir = (startPath, filter, callback) => {
    if (!fs.existsSync(startPath)) {
        console.error('invalid directory', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recursive call
        } else if( filter.test(filename)) {
            callback(filename)
        }
    }
}

/**
 * gets a list of 
 * @returns list of files
 */
const getListOfTestFiles = ({ testExtension = '.test.js' , _testDirectory = '__tests__' } = {}) => {
    fromDir('./', new RegExp(testExtension), addToContainer);
    return fileContainer;
}

export default getListOfTestFiles;