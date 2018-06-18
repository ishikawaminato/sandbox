const { resolveRefs } = require("json-refs");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

async function main(filePath) {
  const root = yaml.load(fs.readFileSync(filePath).toString());
  const options = {
    filter: ["relative", "remote"],
    loaderOptions: {
      processContent: (res, callback) => callback(null, yaml.safeLoad(res.text))
    }
  };
  const result = await resolveRefs(root, options);
  console.log(yaml.dump(result.resolved));
}

module.exports = swaggerFile => {
  const filePath = swaggerFile
    ? path.join(process.cwd(), swaggerFile)
    : path.join(process.cwd(), "index.yml");
  main(filePath).catch(console.error);
};
