module.exports = class Answerer
{
    constructor() {
        this.fs = require("fs")
        this.answers = JSON.parse(this.fs.readFileSync("expressions/dictionary.json"))
        this.howToAnswer = JSON.parse(this.fs.readFileSync("expressions/howToAnswer.json"))
    }

    random_item(items) {
        return items[Math.floor(Math.random()*items.length)];
    }

    prepareText(text) {
        return text.trim()
        .replace(/ /g,'')
        .toLowerCase()
    }

    getAnswer(text = "") {
        console.log('------------------\n'+ text)

        if (typeof text == "object")
            return this.random_item(this.answers["default"]);

        text = this.prepareText(text)

        return this.searchAnswerInDictionary(text)
    }

    searchAnswerInDictionary(text) {
        let key = this.howToAnswer[this.whatIsIt(text)]
        return this.random_item(this.answers[key]);
    }

    whatIsIt(text) {
        for (let key in this.answers) {
            if (this.answers[key].some((substring) => text.includes(this.prepareText(substring)))) {
                return key
            }
        }
        return "default"
    }
}