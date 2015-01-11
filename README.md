Bloggify RSS
============
The RSS plugin for Bloggify.

## Configuration

Defaults are listed.

```js
{
  "name": "rss",
  "source": "git@github.com:Bloggify/rss.git",
  "version": "master",
  "config": {
    // The API plugin name
    "api": "api",

    // The RSS feed url
    "feed_url": "/api/rss",

    // The RSS feed page title
    "title": Bloggify.config.site.title,

    // The RSS feed page description
    "description": Bloggify.config.site.description,

    // Language
    "language": "en",

    // TTL
    "ttl": 60 * 24
  }
}
```

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
