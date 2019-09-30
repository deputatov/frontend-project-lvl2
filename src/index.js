import commander from 'commander';
import packageJSON from '../package.json';

const runHelp = () => {
  commander
    .version(packageJSON.version)
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
  if (!commander.args.length) commander.help();
};

export default runHelp;
