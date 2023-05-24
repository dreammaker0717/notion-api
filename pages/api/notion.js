import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    const { query } = req.query;

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

    const { properties } = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const sorts = [];
    if (properties["No"]) {
      sorts.push({
        property: "No",
        direction: "ascending",
      });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts,
    });

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ results: response.results }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}









































// import { Client } from "@notionhq/client";

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// export default async function handler(req, res) {
//   try {
//     const { query } = req.query;

//     const { results: searchResults } = await notion.search({
//       filter: {
//         property: "object",
//         value: "database",
//       },
//       query,
//     });

//     const databaseResult = searchResults.find(
//       (result) =>
//         result.object === "database" &&
//         result.title[0].text.content.toLowerCase() === query.toLowerCase()
//     );

//     if (!databaseResult) {
//       throw new Error(`${query} not found`);
//     }

//     const databaseId = databaseResult.id;

//     const response = await notion.databases.query({
//       database_id: databaseId,
//       sorts: [
//         {
//           property: "No",
//           direction: "ascending",
//         },
//       ],
//     });

//     res.setHeader("Content-Type", "application/json");
//     res.status(200).send(JSON.stringify({ results: response.results }));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// }





