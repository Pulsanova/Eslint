import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-browser/esnext';

export const EXTENSIONS = [...BASE_EXTENSIONS.ts, 'tsx'];

export default [{
    // - Fichiers
    files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

    // - Règles
    rules: {
    },
}];
