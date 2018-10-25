const { run, help } = require('runjs');
const fs = require('fs');
const util = require('util');
const path = require('path');
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const yinc = require('yamlinc/src/yamlinc');
const yamljs = require('js-yaml');

const pkg_vers = require('./package.json').version;

process.env.TS_POST_PROCESS_FILE = `prettier --write`;

function generateApi(apiName) {
  const cmdFn = async () => {
    const args = process.argv.slice(3);
    const additionalProps = {
      npmVersion: pkg_vers,
      npmName: `@mbx/api-${apiName}`,
      httpUserAgent: `${apiName}-SDK`,
    };
    const qs = JSON.stringify;
    let cmd = [
      'openapi-generator', 'generate',
      '-c', qs(path.resolve('./codegen/typescript.config.json')),
      '-t', qs(path.resolve('./codegen/ts-template')),
      '-o', qs(path.resolve('../../apis', apiName)),
      '-i', qs(path.resolve('./dist/swagger', `${apiName}.json`)),
      '-g', 'typescript-axios',
      '--additional-properties', qs(Object.entries(additionalProps)
        .map(p => p.join('=')).join(',')),
      ...args
    ];

    console.log(cmd.join(' '));

    await run(cmd.join(' '), {
      async: true,
    });
  };
  help(cmdFn, {
    description: 'Generate JS bundle',
    options: {
      'verbose': 'turn up the noise',
    }
  });

  return cmdFn;
}


async function buildSchemas() {
  yinc.setMute(['--mute']);
  const files = (await readdir('./openapi'))
    .filter(s => s.match(/^[a-z]+.yaml/g));

  const distPath = path.resolve(__dirname, 'dist', 'swagger');
  const apiPath = path.resolve(__dirname, 'openapi');

  const writes = [];
  // Hack since swagger-parser doesn't allow specify a resolution root.
  process.chdir(apiPath);
  for (const f of files) {
    const schemaName = f.split('.')[0];
    const data = await yamljs.safeLoad(yinc.loadMetacode(f));
    const destJson = path.join(distPath, `${schemaName}.json`);

    // Resolve includes.
    yinc.recursiveResolve(data, process.cwd());

    // TODO: Some tagging and other automations.
    writes.push(writeFile(destJson, JSON.stringify(data, undefined, 2)));

    console.log('Writing: ', destJson);
  }

  await Promise.all(writes);
}

const codegen = {
  tagbox: generateApi('tagbox'),
  clsbox: generateApi('classificationbox'),
  facebox: generateApi('facebox'),
}

module.exports = {
  buildSchemas,
  codegen: {
    ...codegen,
    all: async () => {
      await Promise.all([
        codegen.clsbox(),
        codegen.tagbox(),
        codegen.facebox(),
      ]);
    }
  }
}
