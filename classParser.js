const cheerio = require("cheerio");

class ClassParser {
  constructor() {}

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

module.exports = ClassParser;
