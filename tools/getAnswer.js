module.exports = class Answerer
{
    constructor() {
        this.fs = require("fs")
        this.salutations = JSON.parse(this.fs.readFileSync("expressions/salutations.json"))
        this.answers = JSON.parse(this.fs.readFileSync("expressions/answers.json"))
    }

    random_item(items) {
        return items[Math.floor(Math.random()*items.length)];
    }

    getAnswer(text = "") {
        console.log('------------------\n'+ text)

        if (typeof text == "object")
            return this.random_item(this.answers["interjections"]);

        text = text.trim().replace(/ /g,'')
        let salut = this.isSalutation(text)
        salut = this.salutations[salut] ? salut : false
        
        return salut ?
            this.random_item(this.salutations[salut]) 
            : this.random_item(this.answers["interjections"])
    }

    isSalutation(text) {
        let iter = 1;

        while (this.salutations[iter]) {
            if (this.salutations[iter++].some((substring) => text.includes(substring.trim().replace(/ /g,'')))) {
                return this.salutations[iter] ? iter : false
            }
        }
        return false
    }

    isChitChat(text) {
        return !this.isSalutation(text)
    }
}