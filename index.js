import { run } from './src/velvet.js';
import loadFiles from './src/finder.js';
import fs from 'fs';
import path from 'path';

const CONFIG_NAME = 'smooth-config.js';

const loadConfig = () => {
    const cwd = process.cwd();
    const configfileName = path.join(cwd, CONFIG_NAME);
}

export const startTesting = () => {
    console.debug('Starting from ', process.cwd());
    const files = loadFiles();
    console.debug('Test files: ', files)
    run(files);
}

startTesting();