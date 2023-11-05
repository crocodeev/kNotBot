
require('esbuild').buildSync({
            bundle: true,
            sourcemap: true,
            platform: 'node',
            entryPoints: ['./index.ts'],
            //drop: ['console'],
            minify: false,
            outdir: './build/'
        })
