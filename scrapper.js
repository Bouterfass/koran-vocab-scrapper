const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

let word = { korean: '', meaning: ''};
let collection = []
let url = "https://www.topikguide.com/100-most-basic-korean-verbs-list/";
let label = "100_most_basic_korean_verbs";

(async () => {

    console.log("scrapping ", url);

    const response = await got(url);
    const dom = new JSDOM(response.body);
    const colList = [...dom.window.document.querySelectorAll('tr')];

    colList.forEach(el => {
        word.korean = el.cells.item(0).innerHTML.trim();
        word.meaning = el.cells.item(1).innerHTML.trim();
        collection.push({...word});
    })

    jsonCollection = JSON.stringify(collection);

    fs.writeFile(`${label}.json`, jsonCollection, err =>{
        if (err)
            console.log("An error occured");
        else 
            console.log("Your file has been created.");
    })
})();


