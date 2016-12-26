"use strict";

const Rss = require("rss")
    , fs = require("fs")
    ;

// The init function
module.exports = (config, Bloggify) => {
    const FILE_PATH = `${__dirname}/rss.xml`;
    Bloggify.server.addPage(config.url, FILE_PATH);

    let renderRss = () => {
        let domain = Bloggify.options.metadata.domain;

        function shortDescription(c) {
            return Bloggify.adapter.contentToHtml(c.content.trim().split("\n")[0])
                 + "<br><a href='" + domain + c.url
                 + "' target='_blank'>Read more »</a>";
        }

        Bloggify.getArticles({
            filter (c) {
                return c.metadata.visible !== false;
            }
        }, (err, data) => {

            // Create the RSS feed object
            let feed = new Rss({
                title: config.title || Bloggify.options.metadata.siteTitle
              , description: config.description || Bloggify.options.metadata.description
              , feed_url: domain + config.url
              , site_url: domain
              , image_url: domain + config.image_url
              , language: config.language
              , pubDate: new Date()
              , ttl: config.ttl || 60 * 24
            });

            // Add items
            data.forEach(function (c) {
                c.url = domain + c.path;
                feed.item({
                    title: c.metadata.title
                  , description: shortDescription(c)
                  , author: c.author
                  , date: c.date
                });
            });

            fs.writeFile(FILE_PATH, feed.xml(), err => {
                err && Bloggify.log(err);
            });
        });
    };

    renderRss();

    Bloggify.on("create-article", renderRss);
    Bloggify.on("save-article", renderRss);
    Bloggify.on("delete-article", renderRss);
    Bloggify.on("delete-articles", renderRss);
};
