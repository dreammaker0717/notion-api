import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    const { query, slug } = req.query;

    const { results: searchResults } = await notion.search({
      filter: {
        property: "object",
        value: "database",
      },
      query,
    });

    const databaseResult = searchResults.find(
      (result) =>
        result.object === "database" &&
        result.title[0].text.content.toLowerCase() === query.toLowerCase()
    );

    if (!databaseResult) {
      throw new Error(`${query} not found`);
    }

    const databaseId = databaseResult.id;

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Created",
          direction: "ascending",
        },
      ],
    });

    // Filter the response based on the value of "checkout" property
    const Results = response.results
      .filter((blog) => blog.properties.Published?.checkbox === true)
      .filter((blog) => {
        if (slug) {
          return blog.properties.Slug.formula.string === slug;
        }
        return true;
      });

    res.setHeader("Content-Type", "application/json");
    res
      .status(200)
      // .send(JSON.stringify({ results: response.results, filteredResponse }));
      .send(JSON.stringify({ Results }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
