const axios = require("axios").default;

class ClassSampler {
  constructor() {}
  async sampleUrl() {
    try {
      let htmlPage = await axios.get(process.env.CLASS_NAMER_URL);
      return htmlPage.data;
    } catch (error) {
      throw new Error(`Request could not be made. ${error.message}`);
    }
  }
}

module.exports = ClassSampler;
