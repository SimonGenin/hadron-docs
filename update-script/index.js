const fs = require('fs');
const axios = require('axios');
const config = require('./config.json');

const getFullPackageName = (name) => `hadron-${name}`;

const getUrl = (packageName) => (
  `https://raw.githubusercontent.com/brainhubeu/hadron/master/packages/${getFullPackageName(packageName)}/README.md`
)

async function downloadPackages(packagesNames, packageHandler) {
  if (packagesNames.length === 0) {
    return;
  } else {
    const packageName = packagesNames[packagesNames.length - 1];
    await axios.get(getUrl(packageName))
      .then(response => {
        return packageHandler(packageName, response.data);
      })
      .catch(error => {
        if (error.response !== undefined) {
          const { status } = error.response;
          console.error(`Package '${packageName}' could not be downloaded. Request failed with status ${status}`);
        } else {
          console.error(error);
        }
      });
    return await downloadPackages(packagesNames.slice(0, -1), packageHandler);
  }
}

const { docsDestinationDirectory: docsDir, packages } = config;

const packageHandler = (packageName, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(`${docsDir}/${packageName}.md`, data, (err) => {
      if (err) rej(err);
      res();
    })
  })
    .then(() => {
      console.log(`Package '${packageName}' has been updated`);
    });
}

downloadPackages(packages, packageHandler);
