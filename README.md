# Azure Cosmos DB Developer Website

Source for https://cosmosdb.microsoft.com, built with [Docusaurus](https://docusaurus.io/).

Content updates go to the `main` branch. Once merged, Azure Pipelines (`azure-pipelines.yml`) deploys them to the live site. The site also rebuilds nightly to refresh the blog, video and event feeds.

For bigger changes, use a feature branch and we can set up a staging slot to review the rendered site.

## Working on the site

Requires Node.js 22 (see `.nvmrc`) and npm. Yarn is not used.

~~~
npm install      # install dependencies
npm start        # local dev server with live reload
npm run build    # production build into build/
npm run serve    # preview the production build
~~~

### Cosmos DB Conf toggles (Stream + Agenda)

The `/conf` page reads defaults from `src/pages/conf/confSettings.json`, so you can hide or show the Stream and Agenda sections without editing React code.

You can override those values with environment variables (restart the dev server after changing them):

- `CONF_SHOW_STREAM`
- `CONF_SHOW_AGENDA`
- `CONF_STREAM_EMBED_URL` (optional; when unset the page shows a placeholder)

bash:

~~~sh
CONF_SHOW_STREAM=false CONF_SHOW_AGENDA=false npm start
CONF_SHOW_STREAM=true CONF_STREAM_EMBED_URL="https://..." npm start
~~~

PowerShell:

~~~powershell
$env:CONF_SHOW_STREAM='false'; $env:CONF_SHOW_AGENDA='false'; npm start
$env:CONF_SHOW_STREAM='true'; $env:CONF_STREAM_EMBED_URL='https://...'; npm start
~~~