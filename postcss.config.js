const fs = require('fs');
const {homepage, version, author} = JSON.parse(fs.readFileSync('package.json'));

const header = `
@charset "UTF-8";

/*!
 * Flux Animation Library by ${author.name}
 * Licensed under the MIT License
 */

`;

module.exports = (ctx) => {
  const devMessage = `Flux ${ctx.env} build compiled successfully!`;

  console.log(devMessage);

  return {
    map: ctx.options.map,
    parser: ctx.options.parser,
    plugins: {
      'postcss-import': {root: ctx.file.dirname},
      'postcss-preset-env': {
        autoprefixer: {
          cascade: false,
        },
        features: {
          'custom-properties': true,
        },
      },
      cssnano: ctx.env === 'production' || ctx.env === 'compat' ? {} : false,
      'postcss-header': {
        header,
      },
    },
  };
};
