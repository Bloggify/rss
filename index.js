// Dependencies
var Rss = require("rss")
  , Marked = require("marked")
  ;

// The init function
module.exports = function (rss) {

    var config = rss.config
      , Api = Bloggify.plugins[config.api || "api"]
      ;

    config.feed_url = config.feed_url || "/api/rss";

    // Add the feed_url page
    Bloggify.server.page.add(config.feed_url, function (lien) {

        var domain = "http://" + lien.req.headers.host;

        /*! This function returns the short description
         *  for an article
         * */
        function shortDescription(c) {
            return Marked.parse(c.content.split("\n")[0])
                 + "<br><a href='" + domain + c.url
                 + "' target='_blank'>Read more »</a>";
        }

        // Get the articles
        Api.emit("request", "articles.list", {
            options: {
                noContent: false
            }
          , m_options: {
                limit: 5
            }
        }, function (err, data) {
            if (err) { return lien.end(500); }

            // Create the RSS feed object
            var feed = new Rss({
                title: config.title || Bloggify.config.site.title
              , description: config.description || Bloggify.config.site.description
              , feed_url: domain + config.feed_url
              , site_url: domain
              , image_url: domain + "/images/logo.png"
              , language: config.language
              , pubDate: new Date()
              , ttl: config.ttl || 60 * 24
            });

            // Add items
            data.forEach(function (c) {
                feed.item({
                    title: c.title
                  , description: shortDescription(c)
                  , url: domain + c.url
                  , author: c.author
                  , date: c.date
                });
            });

            // Send the response
            lien.end(feed.xml());
        });
    });
};
