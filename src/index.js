import { run } from './velvet.js';
import loadFiles from './finder.js';

const startTesting = () => {
    const files = loadFiles();
    console.log(files)
    run(files);
}

startTesting();