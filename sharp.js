const sharp = require('sharp');
const fs = require('fs');

const folder = 'assets/technologies/';

fs.readdirSync(folder).forEach(file => {
  if(file.includes('.png')) {
        filename = file.slice(0, -4)
        console.log(file)
        sharp(folder + file)
            .resize({ height: 40 })
            .toFile(folder + 'retina/' + filename + '.png');
        sharp(folder + file)
            .resize({ height: 80 })
            .toFile(folder + 'retina/' + filename + '@2x.png');
        sharp(folder + file)
            .resize({ height: 120 })
            .toFile(folder + 'retina/' + filename + '@3x.png');
  }
})