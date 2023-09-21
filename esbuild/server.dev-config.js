const esbuild = require('esbuild');
const chokidar = require('chokidar');

(
    async () => {


        const builder = await esbuild.context({
            bundle: true,
            sourcemap: true,
            platform: 'node',
            entryPoints: ['./index.ts'],
            minify: false,
            outdir: './build/'
        })

        chokidar
        .watch('**/*.ts', {
            awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            }
        })
        .on('add', (path) => {
            console.log(`File ${path} has been added to server app`);
            builder.rebuild();
        })
        .on('change', (path) => {
            console.log(`File ${path} has been changed to server app`);
            builder.rebuild();
        })
        .on('unlink', (path) => {
            console.log(`File ${path} has been removed to server app`);
            builder.rebuild();
          })
        .on('addDir', (path) => {
            console.log(`Directory ${path} has been added to server app`);
            builder.rebuild();
        })
        .on('unlinkDir', (path) => {
            console.log(`Directory ${path} has been removed to server app`);
            builder.rebuild();
        });
    }
)()