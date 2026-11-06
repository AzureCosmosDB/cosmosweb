export type LanguageId = 'python' | 'dotnet' | 'java' | 'javascript' | 'go';

export interface Language {
  id: LanguageId;
  name: string;
  /** Prism language used to highlight the snippet. */
  prism: string;
  packageName: string;
  /** Latest published SDK version, verified 2026-11-06 (to be refreshed from registries in CI). */
  version: string;
  install: string;
  quickstart: string;
  guide: string;
  api: string;
  snippet: string;
}

const PRODUCT_PK = 'gear-surf-surfboards';

export const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    prism: 'python',
    packageName: 'azure-cosmos',
    version: '4.17.1',
    install: 'pip install azure-cosmos azure-identity',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-python',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-python',
    api: 'https://learn.microsoft.com/python/api/azure-cosmos/azure.cosmos?view=azure-python',
    snippet: `from azure.cosmos import CosmosClient
from azure.identity import DefaultAzureCredential

client = CosmosClient(endpoint, credential=DefaultAzureCredential())
container = client.get_database_client("cosmicworks").get_container_client("products")

container.upsert_item({
    "id": "70b63682",
    "categoryId": "${PRODUCT_PK}",
    "name": "Yamba Surfboard",
})
item = container.read_item(item="70b63682", partition_key="${PRODUCT_PK}")`,
  },
  {
    id: 'dotnet',
    name: '.NET',
    prism: 'csharp',
    packageName: 'Microsoft.Azure.Cosmos',
    version: '3.63.4',
    install: 'dotnet add package Microsoft.Azure.Cosmos\ndotnet add package Azure.Identity',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-dotnet',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-dotnet-v3',
    api: 'https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos?view=azure-dotnet',
    snippet: `using Azure.Identity;
using Microsoft.Azure.Cosmos;

CosmosClient client = new(endpoint, new DefaultAzureCredential());
Container container = client.GetContainer("cosmicworks", "products");

PartitionKey pk = new("${PRODUCT_PK}");
Product product = new("70b63682", "${PRODUCT_PK}", "Yamba Surfboard");

await container.UpsertItemAsync(product, pk);
Product item = await container.ReadItemAsync<Product>("70b63682", pk);

record Product(string id, string categoryId, string name);`,
  },
  {
    id: 'java',
    name: 'Java',
    prism: 'java',
    packageName: 'com.azure:azure-cosmos',
    version: '4.83.0',
    install: 'com.azure:azure-cosmos (Maven / Gradle)\ncom.azure:azure-identity',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-java',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-java-v4',
    api: 'https://learn.microsoft.com/java/api/com.azure.cosmos?view=azure-java-stable',
    snippet: `CosmosClient client = new CosmosClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();

CosmosContainer container = client.getDatabase("cosmicworks").getContainer("products");

Product product = new Product("70b63682", "${PRODUCT_PK}", "Yamba Surfboard");
container.upsertItem(product);

Product item = container
    .readItem("70b63682", new PartitionKey("${PRODUCT_PK}"), Product.class)
    .getItem();`,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    prism: 'javascript',
    packageName: '@azure/cosmos',
    version: '4.10.1',
    install: 'npm install @azure/cosmos @azure/identity',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-nodejs',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-nodejs',
    api: 'https://learn.microsoft.com/javascript/api/@azure/cosmos/?view=azure-node-latest',
    snippet: `import { CosmosClient } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

const client = new CosmosClient({
  endpoint,
  aadCredentials: new DefaultAzureCredential(),
});
const container = client.database("cosmicworks").container("products");

await container.items.upsert({
  id: "70b63682",
  categoryId: "${PRODUCT_PK}",
  name: "Yamba Surfboard",
});

const item = container.item("70b63682", "${PRODUCT_PK}");
const { resource } = await item.read();`,
  },
  {
    id: 'go',
    name: 'Go',
    prism: 'go',
    packageName: 'azcosmos',
    version: '1.5.0',
    install:
      'go get github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos\ngo get github.com/Azure/azure-sdk-for-go/sdk/azidentity',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-go',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-go',
    api: 'https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos',
    snippet: `// error handling omitted for brevity
cred, _ := azidentity.NewDefaultAzureCredential(nil)
client, _ := azcosmos.NewClient(endpoint, cred, nil)
container, _ := client.NewContainer("cosmicworks", "products")

pk := azcosmos.NewPartitionKeyString("${PRODUCT_PK}")
item := map[string]string{
    "id":         "70b63682",
    "categoryId": "${PRODUCT_PK}",
    "name":       "Yamba Surfboard",
}
body, _ := json.Marshal(item)

_, _ = container.UpsertItem(ctx, pk, body, nil)
resp, _ := container.ReadItem(ctx, pk, "70b63682", nil)`,
  },
];

export interface LinkItem {
  label: string;
  href: string;
}

export interface GuideGroup {
  id: string;
  title: string;
  blurb: string;
  links: LinkItem[];
}

export const guideGroups: GuideGroup[] = [
  {
    id: 'model',
    title: 'Data modeling & partitioning',
    blurb: 'Shape your data and pick a partition key that scales.',
    links: [
      { label: 'Data modeling for NoSQL', href: 'https://learn.microsoft.com/azure/cosmos-db/modeling-data' },
      { label: 'Partitioning and horizontal scaling', href: 'https://learn.microsoft.com/azure/cosmos-db/partitioning' },
      { label: 'Indexing policies', href: 'https://learn.microsoft.com/azure/cosmos-db/index-policy' },
    ],
  },
  {
    id: 'query',
    title: 'Queries & change feed',
    blurb: 'Read your data back and react to every change.',
    links: [
      { label: 'Query language reference', href: 'https://learn.microsoft.com/cosmos-db/query/' },
      { label: 'Change feed', href: 'https://learn.microsoft.com/azure/cosmos-db/change-feed' },
    ],
  },
  {
    id: 'ai',
    title: 'Vector search & AI',
    blurb: 'Build retrieval and agent memory on your operational data.',
    links: [{ label: 'Vector search in Azure Cosmos DB', href: 'https://learn.microsoft.com/azure/cosmos-db/vector-search' }],
  },
  {
    id: 'perf',
    title: 'Performance & cost',
    blurb: 'Understand request units and tune for throughput.',
    links: [{ label: 'Request units', href: 'https://learn.microsoft.com/azure/cosmos-db/request-units' }],
  },
  {
    id: 'global',
    title: 'Consistency & global distribution',
    blurb: 'Trade latency, availability and consistency on purpose.',
    links: [{ label: 'Consistency levels', href: 'https://learn.microsoft.com/azure/cosmos-db/consistency-levels' }],
  },
  {
    id: 'tools',
    title: 'Samples & tools',
    blurb: 'Run it locally and start from working code.',
    links: [
      { label: 'Samples Gallery', href: 'https://azurecosmosdb.github.io/gallery/' },
      { label: 'Local emulator', href: 'https://learn.microsoft.com/azure/cosmos-db/emulator' },
      { label: 'GitHub: AzureCosmosDB', href: 'https://github.com/AzureCosmosDB' },
    ],
  },
];

export interface CommunityItem {
  id: string;
  name: string;
  blurb: string;
  href: string;
}

export const communityItems: CommunityItem[] = [
  { id: 'discord', name: 'Discord', blurb: 'Chat with other developers.', href: 'https://aka.ms/open-source-discord' },
  { id: 'github', name: 'GitHub', blurb: 'Samples, SDKs and open source.', href: 'https://github.com/AzureCosmosDB' },
  { id: 'youtube', name: 'YouTube', blurb: 'Videos and live sessions.', href: 'https://www.youtube.com/@AzureCosmosDB' },
  {
    id: 'meetup',
    name: 'Global user group',
    blurb: 'Virtual meetups with the community.',
    href: 'https://www.meetup.com/azure-cosmos-db-global-user-group',
  },
  { id: 'blog', name: 'Blog', blurb: 'Announcements and deep dives.', href: 'https://devblogs.microsoft.com/cosmosdb/' },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    blurb: 'Ask and answer questions.',
    href: 'https://stackoverflow.com/tags/azure-cosmosdb/info',
  },
  { id: 'x', name: 'X', blurb: 'Follow @AzureCosmosDB.', href: 'https://x.com/AzureCosmosDB' },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    blurb: 'News from the product team.',
    href: 'https://www.linkedin.com/company/azure-cosmos-db',
  },
];

export const learn = {
  paths: {
    title: 'Learn',
    blurb: 'Documentation and self-paced training on Microsoft Learn.',
    links: [
      { label: 'Azure Cosmos DB documentation', href: 'https://learn.microsoft.com/azure/cosmos-db/' },
      { label: 'Azure DocumentDB documentation', href: 'https://learn.microsoft.com/azure/documentdb/' },
      { label: 'Open-source DocumentDB', href: 'https://documentdb.io/' },
    ],
  },
  practice: {
    title: 'Practice',
    blurb: 'Start from working samples and run them on the local emulator.',
    links: [
      { label: 'Samples Gallery', href: 'https://azurecosmosdb.github.io/gallery/' },
      { label: 'Local emulator', href: 'https://learn.microsoft.com/azure/cosmos-db/emulator' },
    ],
  },
  certification: {
    title: 'Get certified',
    name: 'Microsoft Certified: Azure Cosmos DB AI Developer Associate',
    blurb:
      'Validate that you can design, build and optimize high-performance, scalable applications on Azure Cosmos DB, including AI retrieval and agent memory scenarios.',
    facts: ['Associate level', '100-minute proctored exam', 'Renews every 12 months'],
    href: 'https://learn.microsoft.com/credentials/certifications/azure-cosmos-db-developer-specialty/',
  },
};
