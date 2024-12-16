import { run } from './velvet.js';
import loadFiles from './finder.js';

const startTesting = () => {
    const files = loadFiles();
    console.debug('Test files: ', files)
    run(files);
}

startTesting();