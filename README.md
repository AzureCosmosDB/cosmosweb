# Azure Cosmos DB Developer Website

Site is hosted at https://cosmosdb.microsoft.com

Content updates can be made against the `main` branch. Once merged, changes will auto-deploy to the live site.

If you are working on bigger changes, setup a feature branch and we can create a staging slot to review/verify the rendered site.


## Working on the site

Azure Cosmos DB developer home.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Cosmos DB Conf toggles (Stream + Agenda)

The `/conf` page reads defaults from `src/pages/conf/confSettings.json` so you can hide/show the Stream and Agenda sections without editing React code.

You can also override those JSON values via environment variables (useful for local dev / CI). Note: changing env vars requires restarting the dev server.

- `CONF_SHOW_STREAM`
- `CONF_SHOW_AGENDA`
- `CONF_STREAM_EMBED_URL` (optional; when unset the page shows a placeholder)

Examples:

```sh
# Hide Stream + Agenda
CONF_SHOW_STREAM=false CONF_SHOW_AGENDA=false yarn start

# Show Stream and set the live embed URL
CONF_SHOW_STREAM=true CONF_STREAM_EMBED_URL="https://..." yarn start
```

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
