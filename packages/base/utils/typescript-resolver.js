import fs from 'node:fs';
import path from 'node:path';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

const configFiles = new Map();
const findConfigFile = (directory) => {
    if (configFiles.has(directory)) {
        return configFiles.get(directory);
    }

    const parent = path.dirname(directory);
    const configFile = ['tsconfig.json', 'jsconfig.json']
        .map((filename) => path.join(directory, filename))
        .find((file) => fs.existsSync(file))
        ?? (parent === directory ? null : findConfigFile(parent));

    configFiles.set(directory, configFile);
    return configFile;
};

/**
 * Crée un resolver d'imports TypeScript qui rattache chaque fichier
 * analysé à la configuration TypeScript qui le gouverne.
 *
 * @param {object} [options] - Les options du resolver, identique au resolver
 *                             `eslint-import-resolver-typescript`.
 *
 * @returns {object} Un resolver d'imports, au format attendu par `import-x`.
 */
const createTypeScriptResolver = (options = {}) => {
    const resolvers = new Map();
    return {
        interfaceVersion: 3,
        name: 'typescript',
        resolve(source, file) {
            const configFile = findConfigFile(path.dirname(file));
            if (configFile === null) {
                return { found: false };
            }

            if (!resolvers.has(configFile)) {
                const resolver = createTypeScriptImportResolver({
                    ...options,
                    tsconfig: { configFile },
                });
                resolvers.set(configFile, resolver);
            }

            return resolvers.get(configFile).resolve(source, file);
        },
    };
};

export default createTypeScriptResolver;
