const {
  run,
  help
} = require('runjs');

const pkg_vers = require('./package.json').version;

process.env.TS_POST_PROCESS_FILE = `prettier --write`;

async function tagbox() {
  const args = process.argv.slice(3);
  let cmd = [
    'openapi-generator', 'generate',
    '-c', './codegen/api-tagbox.json',
    '-t', './codegen/ts-template',
    '-o', '../../apis/tagbox',
    '-i', './build/tagbox.yaml',
    '-g', 'typescript-axios',
    '--additional-properties', `npmVersion=${pkg_vers}`,
    ...args
  ];

  await run('swagger-cli bundle -t yaml ./openapi/tagbox.yaml -o ./build/tagbox.yaml')
  await run(cmd.join(' '), {
    async: true,
  });
}

async function clsbox() {
  const args = process.argv.slice(3);
  let cmd = [
    'openapi-generator', 'generate',
    '-c', './codegen/api-classificationbox.json',
    '-t', './codegen/ts-template',
    '-o', '../../apis/classificationbox',
    '-i', './build/classificationbox.yaml',
    '-g', 'typescript-axios',
    '--additional-properties', `npmVersion=${pkg_vers}`,
    ...args
  ];

  await run('swagger-cli bundle -t yaml ./openapi/classificationbox.yaml -o ./build/classificationbox.yaml')
  await run(cmd.join(' '), {
    async: true,
  });
}

const helpOpts = {
  description: 'Generate JS bundle',
  options: {
    'verbose': 'turn up the noise',
  }
}

help(tagbox, helpOpts);

module.exports = {
  codegen: {
    tagbox,
    clsbox,
    all: async () => {
      await Promise.all([
        clsbox(),
        tagbox(),
      ]);
    }
  }
}
