const ArticleParser = require("article-parser");
const HtmlToText = require("html-to-text");
const fs = require("fs");

const articlesUrls = [
    "https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82_%C2%AB%D0%93%D0%B5%D0%BD%D0%BE%D0%BC_%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0%C2%BB"
];

async function getArticlesContent() {
    const articlesContents = [];

    for (let articleUrl of articlesUrls) {
        const articleData = await ArticleParser.extract(articlesUrls[0]);
        articlesContents.push(HtmlToText.htmlToText(articleData.content, {
            selectors: [
                {
                    selector: 'a',
                    options: {
                        ignoreHref: true
                    }
                }
            ]
        }));
    }

    return articlesContents;
}

getArticlesContent().then(articles => {
    //console.log(articles)
    fs.writeFile("article.txt", articles[0], err => {
        if (err) {
            throw err;
        }
    });
});