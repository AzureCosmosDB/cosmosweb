export type LanguageId = 'python' | 'dotnet' | 'java' | 'javascript' | 'go' | 'rust';

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

/*
 * The hero snippet shows agent memory: store a memory with its embedding, then recall the closest
 * ones with a vector query scoped to one user's partition. The query shape (parameterized
 * VectorDistance + ORDER BY) and each SDK's call pattern come from the official Learn samples.
 * embed() stands in for a call to your embedding model.
 */
const SETUP = 'container has a vector index on /embedding';

export const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    prism: 'python',
    packageName: 'azure-cosmos',
    version: '4.17.1',
    install: 'pip install azure-cosmos',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-python',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-python',
    api: 'https://learn.microsoft.com/python/api/azure-cosmos/azure.cosmos?view=azure-python',
    snippet: `# ${SETUP}
# embed() calls your embedding model
container.upsert_item({
    "id": "m1",
    "userId": "ava",
    "text": "Prefers window seats",
    "embedding": embed("Prefers window seats"),
})

hits = container.query_items(
    query="SELECT TOP 3 c.text, VectorDistance(c.embedding, @q) AS score "
          "FROM c ORDER BY VectorDistance(c.embedding, @q)",
    parameters=[{"name": "@q", "value": embed("Where should Ava sit?")}],
    partition_key="ava",
)`,
  },
  {
    id: 'dotnet',
    name: '.NET',
    prism: 'csharp',
    packageName: 'Microsoft.Azure.Cosmos',
    version: '3.63.4',
    install: 'dotnet add package Microsoft.Azure.Cosmos',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-dotnet',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-dotnet-v3',
    api: 'https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos?view=azure-dotnet',
    snippet: `// ${SETUP}
// Embed() calls your embedding model
PartitionKey pk = new("ava");
await container.UpsertItemAsync(
    new Memory("m1", "ava", "Prefers window seats", Embed("Prefers window seats")), pk);

QueryDefinition query = new QueryDefinition(
        "SELECT TOP 3 c.text, VectorDistance(c.embedding, @q) AS score " +
        "FROM c ORDER BY VectorDistance(c.embedding, @q)")
    .WithParameter("@q", Embed("Where should Ava sit?"));

using FeedIterator<MemoryHit> hits = container.GetItemQueryIterator<MemoryHit>(
    query, requestOptions: new QueryRequestOptions { PartitionKey = pk });

record Memory(string id, string userId, string text, float[] embedding);
record MemoryHit(string text, double score);`,
  },
  {
    id: 'java',
    name: 'Java',
    prism: 'java',
    packageName: 'com.azure:azure-cosmos',
    version: '4.83.0',
    install: 'com.azure:azure-cosmos (Maven / Gradle)',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-java',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-java-v4',
    api: 'https://learn.microsoft.com/java/api/com.azure.cosmos?view=azure-java-stable',
    snippet: `// ${SETUP}
// embed() calls your embedding model
container.upsertItem(
    new Memory("m1", "ava", "Prefers window seats", embed("Prefers window seats")));

SqlQuerySpec query = new SqlQuerySpec(
    "SELECT TOP 3 c.text, VectorDistance(c.embedding, @q) AS score "
        + "FROM c ORDER BY VectorDistance(c.embedding, @q)",
    new SqlParameter("@q", embed("Where should Ava sit?")));

CosmosPagedIterable<MemoryHit> hits = container.queryItems(
    query,
    new CosmosQueryRequestOptions().setPartitionKey(new PartitionKey("ava")),
    MemoryHit.class);`,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    prism: 'javascript',
    packageName: '@azure/cosmos',
    version: '4.10.1',
    install: 'npm install @azure/cosmos',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-nodejs',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-nodejs',
    api: 'https://learn.microsoft.com/javascript/api/@azure/cosmos/?view=azure-node-latest',
    snippet: `// ${SETUP}
// embed() calls your embedding model
await container.items.upsert({
  id: "m1",
  userId: "ava",
  text: "Prefers window seats",
  embedding: await embed("Prefers window seats"),
});

const { resources: hits } = await container.items
  .query(
    {
      query:
        "SELECT TOP 3 c.text, VectorDistance(c.embedding, @q) AS score " +
        "FROM c ORDER BY VectorDistance(c.embedding, @q)",
      parameters: [{ name: "@q", value: await embed("Where should Ava sit?") }],
    },
    { partitionKey: "ava" },
  )
  .fetchAll();`,
  },
  {
    id: 'go',
    name: 'Go',
    prism: 'go',
    packageName: 'azcosmos',
    version: '1.5.0',
    install: 'go get github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-go',
    guide: 'https://learn.microsoft.com/azure/cosmos-db/sdk-go',
    api: 'https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/sdk/data/azcosmos',
    snippet: `// ${SETUP}
// embed() calls your embedding model
// error handling omitted for brevity
pk := azcosmos.NewPartitionKeyString("ava")
body, _ := json.Marshal(map[string]any{
    "id": "m1", "userId": "ava", "text": "Prefers window seats",
    "embedding": embed("Prefers window seats"),
})
_, _ = container.UpsertItem(ctx, pk, body, nil)

pager := container.NewQueryItemsPager(
    "SELECT TOP 3 c.text, VectorDistance(c.embedding, @q) AS score "+
        "FROM c ORDER BY VectorDistance(c.embedding, @q)",
    pk,
    &azcosmos.QueryOptions{QueryParameters: []azcosmos.QueryParameter{
        {Name: "@q", Value: embed("Where should Ava sit?")}, // []float64
    }},
)`,
  },
  {
    id: 'rust',
    name: 'Rust',
    prism: 'rust',
    packageName: 'azure_data_cosmos',
    version: '1.0.0',
    install: 'cargo add azure_data_cosmos futures',
    quickstart: 'https://learn.microsoft.com/azure/cosmos-db/quickstart-rust',
    guide: 'https://github.com/Azure/azure-sdk-for-rust/tree/main/sdk/cosmos/azure_data_cosmos',
    api: 'https://docs.rs/azure_data_cosmos/latest/azure_data_cosmos/',
    snippet: `// ${SETUP}
// embed() calls your embedding model
let memory = Memory {
    id: "m1".into(),
    user_id: "ava".into(),
    text: "Prefers window seats".into(),
    embedding: embed("Prefers window seats"),
};
container.upsert_item("ava", "m1", memory, None).await?;

let query = Query::from(
    "SELECT TOP 3 c.text, VectorDistance(c.embedding, @q) AS score \\
     FROM c ORDER BY VectorDistance(c.embedding, @q)",
)
.with_parameter("@q", embed("Where should Ava sit?"))?;

let mut hits = container
    .query_items::<MemoryHit>(query, FeedScope::partition("ava"), None)
    .await?;
while let Some(hit) = hits.try_next().await? {
    println!("{} ({})", hit.text, hit.score);
}`,
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
];

export interface Scenario {
  id: string;
  tags: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'agents',
    tags: 'Python / LangGraph / Agents',
    title: 'Give your agents a memory.',
    blurb: 'Build a multi-agent travel planner with persistent memory. Start with an existing hands-on workshop.',
    cta: 'Open the workshop',
    href: 'https://github.com/AzureCosmosDB/travel-multi-agent-workshop',
  },
  {
    id: 'rag',
    tags: 'Vector / Hybrid search / RAG',
    title: 'Ground AI in your own data.',
    blurb: 'Explore retrieval-augmented generation patterns and vector search for AI-powered applications.',
    cta: 'Explore RAG patterns',
    href: 'https://learn.microsoft.com/azure/cosmos-db/gen-ai/rag',
  },
  {
    id: 'production',
    tags: 'Prototype / Evaluate / Operate',
    title: 'Take a build toward production.',
    blurb: 'Follow the four-part Code with Cosmos series, from AI-assisted development to production operations.',
    cta: 'Explore Code with Cosmos',
    href: 'https://devblogs.microsoft.com/cosmosdb/code-with-cosmos/',
  },
];

export const gallery = {
  label: 'Looking for working code? Start from a ready-made sample.',
  cta: 'Browse the sample gallery',
  href: 'https://azurecosmosdb.github.io/gallery/',
};

export type ToolIconId = 'vscode' | 'emulator' | 'explorer' | 'agentKit' | 'mcpServer' | 'mcpToolkit' | 'capacity' | 'migrate' | 'assistant';

export interface Tool {
  id: string;
  icon: ToolIconId;
  name: string;
  blurb: string;
  href: string;
  /** Only claims the docs support: GA, Preview, Open source. */
  badge?: string;
  secondary?: LinkItem;
}

export interface ToolGroup {
  id: string;
  title: string;
  blurb: string;
  tools: Tool[];
}

export const toolGroups: ToolGroup[] = [
  {
    id: 'build',
    title: 'Build & debug',
    blurb: 'Write, run and inspect your data from the editor, the browser or your laptop.',
    tools: [
      {
        id: 'vscode',
        icon: 'vscode',
        name: 'VS Code extension',
        blurb: 'Connect to your accounts, browse containers and run queries without leaving the editor.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/vscode-extension/overview',
        secondary: {
          label: 'Get it on the Marketplace',
          href: 'https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb',
        },
      },
      {
        id: 'emulator',
        icon: 'emulator',
        name: 'Local emulator',
        blurb: 'Develop and test offline, with no Azure subscription and no service costs.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/emulator',
      },
      {
        id: 'explorer',
        icon: 'explorer',
        name: 'Data Explorer',
        blurb: 'A web interface to browse data, run queries and inspect results, full screen.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/data-explorer',
        secondary: { label: 'Open cosmos.azure.com', href: 'https://cosmos.azure.com' },
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI-assisted development',
    blurb: 'Let coding assistants and agents work with Azure Cosmos DB, with the right guardrails.',
    tools: [
      {
        id: 'agent-kit',
        icon: 'agentKit',
        name: 'Agent Kit',
        blurb:
          'Best-practice skills that help AI coding assistants avoid costly Azure Cosmos DB mistakes in modeling, partitioning and queries.',
        href: 'https://github.com/AzureCosmosDB/cosmosdb-agent-kit',
        badge: 'GA',
        secondary: {
          label: 'Read the docs',
          href: 'https://learn.microsoft.com/azure/cosmos-db/gen-ai/agent-kit/overview',
        },
      },
      {
        id: 'mcp-server',
        icon: 'mcpServer',
        name: 'Azure MCP Server',
        blurb:
          'Manage accounts, databases and containers with natural language: query items, search by text or vector similarity, infer schemas.',
        href: 'https://learn.microsoft.com/azure/developer/azure-mcp-server/tools/azure-cosmos-db',
      },
      {
        id: 'mcp-toolkit',
        icon: 'mcpToolkit',
        name: 'MCP toolkit',
        blurb: 'An open-source Model Context Protocol toolkit that lets AI agents interact with Azure Cosmos DB securely.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/gen-ai/model-context-protocol-toolkit',
        badge: 'Open source',
        secondary: { label: 'View on GitHub', href: 'https://github.com/AzureCosmosDB/MCPToolKit' },
      },
    ],
  },
  {
    id: 'plan',
    title: 'Plan & migrate',
    blurb: 'Size your workload, then move your data in.',
    tools: [
      {
        id: 'capacity',
        icon: 'capacity',
        name: 'Capacity planner',
        blurb: 'Estimate the request units your workload needs before you provision.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/estimate-ru-with-capacity-planner',
        secondary: { label: 'Open the planner', href: 'https://cosmos.azure.com/capacitycalculator/' },
      },
      {
        id: 'migrate',
        icon: 'migrate',
        name: 'Data Migration Tool',
        blurb: 'An open-source command-line app to import data into, or export it from, Azure Cosmos DB.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/how-to-migrate-desktop-tool',
        badge: 'Open source',
        secondary: { label: 'View on GitHub', href: 'https://github.com/AzureCosmosDB/data-migration-desktop-tool' },
      },
      {
        id: 'assistant',
        icon: 'assistant',
        name: 'Migration Assistant',
        blurb: 'An AI-guided workflow in VS Code for moving from relational databases to NoSQL data models.',
        href: 'https://learn.microsoft.com/azure/cosmos-db/vscode-extension/cosmos-db-migration-assistant',
        badge: 'Preview',
      },
    ],
  },
];

export type VideoKind = 'short' | 'deep';

export interface Video {
  id: string;
  kind: VideoKind;
  label: string;
  /** Curated videos name their source; videos from the channel feed show their publish date instead. */
  source?: string;
  title: string;
  blurb?: string;
  date?: string;
  dateLabel?: string;
  href: string;
  /** Preview image: shipped in static/img/hub, or an absolute URL for videos read from the channel feed. */
  image: string;
}

/**
 * Curated videos. The page shows the latest videos from the YouTube channel feed instead when the build can
 * reach it (see plugins/youtube-feed); these are the fallback.
 */
export const videos: Video[] = [
  {
    id: 'agent-kit-setup',
    kind: 'short',
    label: 'Short',
    source: 'Azure Cosmos DB',
    title: 'What Is Azure Cosmos DB Agent Kit? Setup in 45 Seconds',
    blurb: 'A quick introduction to the Agent Kit.',
    href: 'https://www.youtube.com/shorts/FyCK7rzq_Gc',
    image: '/img/hub/video-FyCK7rzq_Gc.jpg',
  },
  {
    id: 'idea-to-prototype',
    kind: 'short',
    label: 'Short',
    source: 'Azure Cosmos DB',
    title: 'From Idea to Working Prototype with AI + Azure Cosmos DB',
    blurb: 'See what a first build can look like.',
    href: 'https://www.youtube.com/shorts/0jmey3s5eSE',
    image: '/img/hub/video-0jmey3s5eSE.jpg',
  },
  {
    id: 'agent-kit-ga',
    kind: 'short',
    label: 'Short',
    source: 'Azure Cosmos DB',
    title: 'Azure Cosmos DB Agent Kit is GA',
    blurb: 'Get the quick update on Agent Kit availability.',
    href: 'https://www.youtube.com/shorts/St-Ahjhy8vc',
    image: '/img/hub/video-St-Ahjhy8vc.jpg',
  },
  {
    id: 'code-with-cosmos-4',
    kind: 'deep',
    label: 'Code with Cosmos',
    source: 'Azure Cosmos DB / Episode 4',
    title: 'Operating AI Agents in Production',
    blurb: 'Keep learning beyond the prototype.',
    href: 'https://www.youtube.com/watch?v=NNw_VdIL18o',
    image: '/img/hub/video-NNw_VdIL18o.jpg',
  },
  {
    id: 'savill-optimization',
    kind: 'deep',
    label: 'Creator perspective',
    source: 'John Savill',
    title: 'Cosmos DB Optimization',
    blurb: 'A creator-led technical deep dive.',
    href: 'https://www.youtube.com/watch?v=RbH5F_3w47E',
    image: '/img/hub/video-RbH5F_3w47E.jpg',
  },
];

export interface Offer {
  id: string;
  eyebrow: string;
  title: string;
  date: string;
  blurb: string;
  cta: string;
  href: string;
  fine: string;
  fineLink?: LinkItem;
  /** Last day the offer is shown (Pacific time). The page hides it afterwards. */
  expires: string;
}

export const offers: Offer[] = [
  {
    id: 'ignite',
    eyebrow: 'Microsoft Ignite / In person',
    title: 'Ignite is your launchpad.',
    date: 'November 17-20, 2026 / San Francisco',
    blurb:
      "Meet the developer community, explore Azure Cosmos DB sessions, and take DP-420 onsite at no charge if you're a registered in-person attendee.",
    cta: 'Explore onsite certification',
    href: 'https://learn.microsoft.com/training/topics/ignite/microsoft-ignite-2026-certification-registration',
    fine: 'Testing: November 16-20. One Microsoft or one GitHub exam per eligible attendee. Registration, available seats, and official terms apply.',
    expires: '2026-11-20',
  },
  {
    id: 'data-days',
    eyebrow: 'Data Days: AI @ Work / Online',
    title: 'Keep the momentum going, wherever you are.',
    date: '50% exam discount request opportunity',
    blurb:
      'DP-420 is included in the Data Days certification offer. Join Fabric Community, watch two Data Days sessions, then submit a discount request.',
    cta: 'Explore Data Days',
    href: 'https://aka.ms/datadays',
    fine: 'November 2-December 15. Request by December 10, 2026, while supplies last. Eligibility and offer terms apply; issuance is not guaranteed.',
    fineLink: { label: 'Offer terms', href: 'https://aka.ms/dd/cert50/terms' },
    expires: '2026-12-10',
  },
];

export interface EventItem {
  id: string;
  month: string;
  day: string;
  title: string;
  where: string;
  blurb: string;
  cta: string;
  href: string;
  /** ISO dates (Pacific time). Items without dates are always shown. */
  start?: string;
  end?: string;
}

export const events: EventItem[] = [
  {
    id: 'ignite',
    month: 'NOV 2026',
    day: '17-20',
    title: 'Microsoft Ignite',
    where: 'San Francisco',
    blurb: 'Explore Azure Cosmos DB sessions and meet the developer community. Onsite exam testing runs November 16-20.',
    cta: 'Explore sessions',
    href: 'https://ignite.microsoft.com/sessions',
    start: '2026-11-17',
    end: '2026-11-20',
  },
  {
    id: 'data-days',
    month: 'NOV - DEC',
    day: '2-15',
    title: 'Data Days: AI @ Work',
    where: 'Online',
    blurb: 'Live and on-demand learning with a DP-420 discount request opportunity.',
    cta: 'Join Data Days',
    href: 'https://aka.ms/datadays',
    start: '2026-11-02',
    end: '2026-12-15',
  },
];

export interface Post {
  id: string;
  date: string;
  dateLabel: string;
  topic?: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
  /** Preview image: shipped in static/img/hub, or an absolute URL for posts read from the feed. */
  image?: string | null;
}

/**
 * Curated posts. The page shows the latest posts from the dev blog feed instead when the build can reach it
 * (see plugins/devblog-feed); these are the fallback.
 */
export const posts: Post[] = [
  {
    id: 'chatgpt',
    date: '2026-11-03',
    dateLabel: 'November 3, 2026',
    topic: 'Certification',
    title: "ChatGPT runs on Azure Cosmos DB. Prove you can build what's next.",
    blurb: 'Explore the refreshed DP-420 exam and current Ignite and Data Days opportunities.',
    cta: 'Read the article',
    href: 'https://devblogs.microsoft.com/cosmosdb/chatgpt-runs-on-azure-cosmos-db-prove-you-can-build-whats-next/',
    image: '/img/hub/post-chatgpt.jpg',
  },
  {
    id: 'code-with-cosmos',
    date: '2026-10-23',
    dateLabel: 'October 23, 2026',
    topic: 'Hands-on development',
    title: 'Code with Cosmos: Build a Production-Ready AI App in Four Episodes',
    blurb: 'Follow a practical series connecting AI-assisted development, retrieval, agents, and production.',
    cta: 'Read and build along',
    href: 'https://devblogs.microsoft.com/cosmosdb/code-with-cosmos/',
    image: '/img/hub/post-code-with-cosmos.jpg',
  },
];

export interface CommunityItem {
  id: string;
  name: string;
  blurb: string;
  href: string;
}

export const communityItems: CommunityItem[] = [
  {
    id: 'discord',
    name: 'Microsoft Open Source Discord',
    blurb: 'Connect in the wider Microsoft developer community. Not a Cosmos-only server.',
    href: 'https://aka.ms/open-source-discord',
  },
  {
    id: 'reddit',
    name: 'r/CosmosDB',
    blurb: 'Talk with other Azure Cosmos DB users in an independently moderated community.',
    href: 'https://www.reddit.com/r/CosmosDB/',
  },
  {
    id: 'github',
    name: 'GitHub',
    blurb: 'Find SDKs, samples, workshops and places to contribute to the Cosmos ecosystem.',
    href: 'https://github.com/AzureCosmosDB',
  },
  {
    id: 'qna',
    name: 'Microsoft Q&A',
    blurb: 'Ask a technical question or browse answers under the Azure Cosmos DB tag.',
    href: 'https://learn.microsoft.com/en-us/answers/tags/187/azure-cosmos-db',
  },
  { id: 'x', name: 'X', blurb: 'Follow @AzureCosmosDB.', href: 'https://x.com/AzureCosmosDB' },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    blurb: 'News from the product team.',
    href: 'https://www.linkedin.com/company/azure-cosmos-db',
  },
];

export interface Person {
  id: string;
  badge: string;
  name: string;
  role: string;
  /** Shown under the role for people who are also Microsoft Regional Directors. */
  regionalDirector?: boolean;
  blurb: string;
  cta: string;
  href: string;
  /** Profile and personal-site links shown at the bottom of the card. */
  links: Array<{label: string; href: string; icon: 'linkedin' | 'website'}>;
  /** Photo already shipped with the site (static/img/speakers). */
  image: string;
}

/* All three are Azure Cosmos DB Cosmonauts and Microsoft MVPs; each card links to their MVP profile. */
export const people: Person[] = [
  {
    id: 'chander',
    badge: 'Cosmonaut & MVP',
    name: 'Chander Dhall',
    role: 'Azure Cosmos DB Cosmonaut / Microsoft AI MVP',
    regionalDirector: true,
    blurb: 'Shares practical guidance on AI memory patterns, token usage, and costs with Azure Cosmos DB.',
    cta: "View Chander's MVP profile",
    href: 'https://mvp.microsoft.com/MVP/profile/4dbc70c0-3c9a-e411-93f2-9cb65495d3c4',
    links: [
      {label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/csdhall'},
      {label: 'Website', icon: 'website', href: 'https://chanderdhall.com/'},
    ],
    image: '/img/speakers/chander-dhall.jpg',
  },
  {
    id: 'hasan',
    badge: 'Cosmonaut & MVP',
    name: 'Hasan Savran',
    role: 'Azure Cosmos DB Cosmonaut / Microsoft Data Platform MVP',
    blurb: 'A community perspective on making better Azure Cosmos DB data-modeling decisions.',
    cta: "View Hasan's MVP profile",
    href: 'https://mvp.microsoft.com/MVP/profile/20773cee-6250-e911-a987-000d3a1378f6',
    links: [
      {label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/hasansavran/'},
      {label: 'Website', icon: 'website', href: 'https://savranweb.com/'},
    ],
    image: '/img/speakers/hasan-savran.jpg',
  },
  {
    id: 'eric',
    badge: 'Cosmonaut & MVP',
    name: 'Eric Boyd',
    role: 'Azure Cosmos DB Cosmonaut / Microsoft Azure & AI MVP',
    regionalDirector: true,
    blurb: 'Shares distributed locks, sagas, and coordination patterns with Azure Cosmos DB.',
    cta: "View Eric's MVP profile",
    href: 'https://mvp.microsoft.com/MVP/profile/77e968c6-3c9a-e411-93f2-9cb65495d3c4',
    links: [
      {label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/EricDBoyd'},
      {label: 'Website', icon: 'website', href: 'https://responsivex.com/'},
    ],
    image: '/img/speakers/eric-boyd.jpg',
  },
];

export const growth = {
  sectionTitle: 'Cosmonauts',
  sectionLead:
    'Meet the people behind the possibility. Get inspired by the people who build, teach, and share, then find your own path from learner to community leader.',
  eyebrow: 'From learner to community leader',
  title: 'Plot your path toward Cosmonaut recognition and Microsoft MVP.',
  blurb: "Start by making a meaningful contribution. Grow expertise, help others, and build a body of work you're proud to share.",
  cta: {label: 'Understand the Microsoft MVP award', href: 'https://mvp.microsoft.com/faq?section=mvp'},
  steps: [
    {
      title: 'Build real expertise.',
      text: 'Create with Azure Cosmos DB. DP-420 can validate your skills; it is not a stated requirement for either recognition.',
    },
    {
      title: 'Contribute consistently.',
      text: 'Share useful projects, explain what you learned, answer questions, speak, and mentor.',
    },
    {
      title: 'Connect with the Azure Cosmos DB community.',
      text: 'Participate and share your work. Cosmonauts are nominated, so visible, consistent contributions are how you get noticed.',
    },
    {
      title: 'Explore Microsoft MVP nomination.',
      text: 'Document impactful, verifiable contributions from the last 12 months. A current MVP or Microsoft employee must nominate you before the application and review.',
    },
  ],
  fine: 'Cosmonaut recognition and Microsoft MVP are separate. Passing DP-420 or participating does not guarantee either. Cosmonauts are nominated; there is no public Cosmonaut application process.',
};

export const closing = {
  title: 'Ready to try Azure Cosmos DB?',
  blurb: 'Get started for free, run your first queries, and learn as you build.',
  cta: {label: 'Try Azure Cosmos DB free', href: 'https://aka.ms/trycosmos'},
};

export const learn = {
  intro: {
    label: 'New to Azure Cosmos DB? Start small. Run your first NoSQL queries.',
    cta: 'Try the introductory module on AI Skills Navigator',
    href: 'https://aiskillsnavigator.microsoft.com/explore/search/module-a3cf2b721191d7db562be0dd1d6a5aeaabc63209ae15e69fab96578265b8e100',
  },
  certification: {
    code: 'DP-420',
    meta: 'AI-focused / Updated October 2026',
    eyebrow: 'Build confidence. Prove your skills.',
    name: 'Azure Cosmos DB AI Developer Associate',
    blurb:
      'Design, build, and optimize scalable AI applications with Azure Cosmos DB. Bring your database fundamentals together with RAG, agent memory, and conversation state.',
    cta: 'Explore the certification',
    href: 'https://aiskillsnavigator.microsoft.com/credentials/cert-9dd56fc8edb3e7187b5b95c643f6587c81e088731a6e96b3e64e3a94d324df47',
    fine: 'Microsoft Certified: Azure Cosmos DB AI Developer Associate.',
  },
  launchpad: {
    eyebrow: 'Your learning launchpad',
    title: 'A clear path from curious to ready.',
    blurb: 'Start with a short module, follow the full course, or work through a learning path.',
    steps: [
      {
        title: 'New here? Try Azure Cosmos DB.',
        meta: 'Introductory module / Get hands-on with the basics',
        href: 'https://aiskillsnavigator.microsoft.com/explore/search/module-a3cf2b721191d7db562be0dd1d6a5aeaabc63209ae15e69fab96578265b8e100',
      },
      {
        title: 'Build AI applications with Azure Cosmos DB.',
        meta: 'DP-420 course / Follow the full learning journey',
        href: 'https://aiskillsnavigator.microsoft.com/explore/search/course-0bb289fa6910b0c5559747dd066872aedfb982d05b6821ee509ed39cd9a058fa',
      },
      {
        title: 'Develop AI solutions with Azure Cosmos DB.',
        meta: 'Learning path / Put AI capabilities into practice',
        href: 'https://aiskillsnavigator.microsoft.com/explore/search/learningpath-a5bf75de10502246182745eabf16eb1cf168970f2c5fd72fc1c84f4928a4702a',
      },
    ],
    links: [
      { label: 'Current study guide', href: 'https://learn.microsoft.com/credentials/certifications/resources/study-guides/dp-420' },
      {
        label: 'Practice & exam scheduling on Learn',
        href: 'https://learn.microsoft.com/credentials/certifications/azure-cosmos-db-developer-specialty/?practice-assessment-type=certification',
      },
    ],
  },
};
