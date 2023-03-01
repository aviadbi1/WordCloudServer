const axios = require("axios").default;
const cheerio = require("cheerio");

class ClassSampler {
  constructor() {}
  async generateWordCloud() {
    const wordsMap = new Map();
    const promises = [];

    for (let i = 0; i < process.env.NUMBER_OF_SAMPLES; i++) {
      promises.push(this.sampleAndParseClassName());
    }

    const classNames = await Promise.all(promises);
    classNames.forEach((wordsInClassName) => {
      for (const word of wordsInClassName) {
        if (wordsMap.has(word)) {
          wordsMap.set(word, wordsMap.get(word) + 1);
        } else {
          wordsMap.set(word, 1);
        }
      }
    });

    return Object.fromEntries(wordsMap);
  }

  async sampleAndParseClassName() {
    try {
      let htmlPage = await axios.get(process.env.CLASS_NAMER_URL);
      return this.extractWordsFromHtml(htmlPage.data);
    } catch (error) {
      throw new Error(`Request could not be made. ${error.message}`);
    }
  }

  extractWordsFromHtml(htmlData) {
    try {
      let words = [];
      const $ = cheerio.load(htmlData);
      const className = $("#classname");
      if (className.length == 1) {
        words = className[0].children
          .filter((el) => el.type == "text")
          .map((textEl) => textEl.data);
        if (words.length !== 3) {
          throw new Error("Could not find 3 words in className element");
        }
        return words;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ClassSampler;
