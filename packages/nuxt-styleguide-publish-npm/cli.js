#!/usr/bin/env node

const prompt = require('prompt');
const minimist = require('minimist');
const path = require('path');
const chalk = require('chalk');
const publish = require('./publish');

if (!minimist(process.argv.slice(2)).publish) {
  console.log(
    `About to publish library from ${chalk.bold(
      `./${path.relative(process.cwd(), publish.componentsDir)}`
    )}`
  );
  console.log(
    `As ${chalk.green(`${publish.pkg.name}@${publish.pkg.version}`)}`
  );

  prompt.start();

  prompt.get(
    [
      {
        name: 'continue',
        description: 'Continue? (y/n)',
        type: 'string', // Specify the type of input to expect.
      },
    ],
    (err, result) => {
      if (
        err ||
        !result ||
        !result.continue ||
        result.continue.toLowerCase() !== 'y'
      ) {
        console.log(chalk.red('Aborted'));
      } else {
        publish.publish();
      }
    }
  );
} else {
  publish.publish();
}
