import commander from 'commander';
import packageJSON from '../package.json';
import genDiff from '.';

export default () => {
  commander
    .version(packageJSON.version)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'Output format', 'pretty')
    .arguments('<pathToFile1> <pathToFile2>')
    .action((pathToFile1, pathToFile2) => console.log(genDiff(pathToFile1,
      pathToFile2, commander.format)))
    .parse(process.argv);

  if (!commander.args.length) commander.help();
};
