import commander from 'commander';
import packageJSON from '../package.json';

const runHelp = () => {
  commander
    .version(packageJSON.version)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => console.log(filepath1, filepath2, commander.format))
    .parse(process.argv);
  if (!commander.args.length) commander.help();
};

export default runHelp;
