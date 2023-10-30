// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-top-level-await */

const fs = require(`fs`).promises;
const transformer = require(`api-spec-transformer`);
const YAML = require(`yamljs`);

// // Set a timeout so that we can periodically query the website where the JSON formatted API documentation is
// // currently set at 6 hours
// // setTimeout(createJSONFile, 21600)

// // async function createJSONFile() {
// //   try {
// //     console.log("ORDER OF EXECUTION: 7")

// //     const response = await fetch('https://developer.skroutz.gr/assets/misc/skroutz_postman_collection.json')
// //     const json = await response.json()

// //     await fs.writeFile("./docs/skroutz_api.json", JSON.stringify(json));
// //     console.log("The JSON file was saved!");

// //   } catch (error) {
// //     console.log(error.response.body);
// //   }

// //   console.log("ORDER OF EXECUTION: 8")

// // };
// //
// (async function createYAMLFile() {
//   const autoToSwagger = new transformer.Converter(
//     transformer.Formats.AUTO,
//     transformer.Formats.SWAGGER
//   );

//   console.log(`ORDER OF EXECUTION: 1`);

//   autoToSwagger.loadFile(`v1/helpers/collection.json`, (err) => {
//     if (err) {
//       console.log(err.stack);

//       return;
//     }

//     console.log(`ORDER OF EXECUTION: 4`);

//     autoToSwagger
//       .convert(`yaml`)
//       .then((convertedData) => {
//         console.log(convertedData);
//         // ConvertedData is a swagger YAML string
//         // console.log(convertedData);

//         console.log(`ORDER OF EXECUTION: 6`);

//         fs.writeFile(`v1/helpers/swagger_api.yaml`, convertedData, (err1) => {
//           if (err1) {
//             return console.log(err1);
//           }
//         });
//         console.log(`The YAML file was saved!`);
//       })
//       .catch((ex) => {
//         console.log(ex);
//       });

//     console.log(`ORDER OF EXECUTION: 5`);
//   });

//   console.log(`ORDER OF EXECUTION: 2`);
// })();

// console.log(`ORDER OF EXECUTION: 3`);
const ymlfile = YAML.load(`v1/helpers/swagger_api.yaml`);

module.exports = ymlfile;
