// import chalk fr"chalk"lk';
import clear from 'clear';
import figlet from 'figlet';
// import p"commander" 'commander';
// import arg = process.argv[2];
clear();

figlet.fonts(({ err, fonts }) => {
  if (err) {
    console.log('oh something went wrong...');
    console.dir(err);
    return;
  }
  console.dir(fonts);
});
// console.log(
//   chalk.red(
//     figlet.textSync('pizza-cli', { horizontalLayout: 'full' })
//   )
// );
