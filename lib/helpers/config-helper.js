import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default class ConfigHelper {
  static load(fileName) {
    try {
      let data = yaml.safeLoad(
        fs.readFileSync(
          path.join(__dirname, `../../data/${fileName}.yml`),
          'utf8'
        )
      );

      if (data[ENVIRONMENT]) {
        data = data[ENVIRONMENT];
        if (data[COUNTRY]) {
          data = data[COUNTRY];
        }
      }

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
