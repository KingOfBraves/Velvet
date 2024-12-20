import path from 'path';
import { readFile } from 'fs/promises';
import vm from 'vm';

class Swatch {
    constructor(file) {
        this.file = file;
        this.content = '';
        this.context = {};
        this.imports = new Map();
    }

    async load() {
        if (this.file) {
            await this._readFile(this.file);
        }
    }

    async _linker(specifier, referencingModule) {
        if (this.imports.has(specifier))
            return this.imports.get(specifier);
        const directory = path.dirname(this.file);
        const resolvedFilename = path.join(directory, specifier).replace('\\', '/');
        let mod;
        try {
            mod = await import(resolvedFilename);
        } catch (e) {
            mod = await import(specifier);
        }
        const exportNames = Object.keys(mod);
        const imported = new vm.SyntheticModule(
            exportNames,
            function () {
              exportNames.forEach(key => imported.setExport(key, mod[key]));
            },
            { identifier: specifier, context: referencingModule.context }
        );

        this.imports.set(specifier, imported);
        return imported;
    }

    async _readFile(file) {
        console.debug('reading file', file)
        const data = await readFile(path.resolve(process.cwd() + '/velvet', file))
        this.content = '(async function() {' + data.toString() + '})();'
        this.module = new vm.SourceTextModule(data.toString(), { context: this.context });
        await this.module.link(this._linker.bind(this));
        // await testModule.evaluate();
        // this.script = new vm.Script(this.content, { importModuleDynamically: vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER })
    }

    createContext(ctx) {
        const newContext = ctx ?? vm.createContext();
        this.context = newContext;
    }

    async run() {
        // const res = vm.runInContext(this.content, this.context);
        // this.script.runInContext(this.context);
        if (this.module) {
            await this.module.evaluate();
        }
    }
}

export default Swatch;