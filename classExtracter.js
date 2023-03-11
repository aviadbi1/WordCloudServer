class ClassSampler {
  constructor(sampler, parser) {
    this.sampler = sampler;
    this.parser = parser;
  }
  async generateWordCloud() {
    const wordsMap = new Map();
    const promises = [];

    for (let i = 0; i < process.env.NUMBER_OF_SAMPLES; i++) {
      promises.push(this.sampleAndParse());
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

  async sampleAndParse() {
    const data = await this.sampler.sampleUrl();
    return this.parser.extractWordsFromHtml(data);
  }
}

module.exports = ClassSampler;
