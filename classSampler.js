const axios = require("axios").default;

class ClassSampler {
  constructor() {}
  async generateWordCloud() {
    const wordsMap = new Map();
    for (let i = 0; i < process.env.NUMBER_OF_SAMPLES; i++) {
      const wordsInClassName = await this.sampleAndParseClassName();
      for (word in wordsInClassName) {
        if (wordsMap.has(word)) {
          wordsMap.set(word, wordsMap.get(word) + 1);
        }
      }
    }
    return wordsMap;
  }

  async sampleAndParseClassName() {
    try {
      let htmlPage = await axios.get(process.env.CLASS_NAMER_URL);
      return this.extractWordsFromHtml(htmlPage);
    } catch (error) {
      throw new Error(`Request could not be made. ${error.message}`);
    }
  }

  extractWordsFromHtml(htmlPage) {
    const words = [];
    
    return words;
  }
}

module.exports = ClassSampler;
