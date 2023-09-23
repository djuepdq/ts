import { create, search, insert } from "@orama/orama"
import { TablesSchema, createQueries, createStore } from "tinybase"

const tableSchema: TablesSchema = {
  globalLinks: {
    title: { type: "string" },
    url: { type: "string" },
    id: { type: "string" },
  },
}

const store = createStore()
store.setTablesSchema(tableSchema)

store.addRow("globalLinks", {
  id: "1",
  title: "Learn Anything",
  url: "https://learn-anything.xyz",
})

store.addRow("globalLinks", {
  id: "2",
  title: "TinyBase",
  url: "https://tinybase.org",
})

const queries = createQueries(store)
queries.setQueryDefinition("allGlobalLinks", "globalLinks", ({ select }) => {
  select("id")
  select("title")
  select("url")
})

const db = await create({
  schema: {
    id: "string",
    title: "string",
    url: "string",
  },
})

// await insert(db, {
//   id: "1",
//   title: "Learn Anything",
//   url: "https://learn-anything.xyz",
// })

// await insert(db, {
//   id: "2",
//   title: "TinyBase",
//   url: "https://tinybase.org",
// })

store.forEachRow("globalLinks", async (rowId, forEachCell) => {
  console.log(rowId, "row id")
  let globalLink = {}
  forEachCell((cellId, cellValue) => {
    console.log(cellId, "id")
    console.log(cellValue, "value")
    globalLink[cellId] = cellValue
  })
  await insert(db, {
    id: globalLink.id,
    url: globalLink.url,
    title: globalLink.title,
  })
})

// queries.forEachResultRow("allGlobalLinks", async (rowId) => {
//   const row = queries.getResultRow("allGlobalLinks", rowId)
//   console.log(row, "row")
//   console.log(row.title.toString(), "title")
//   await insert(db, {
//     id: row.id.toString(),
//     url: row.url.toString(),
//     title: row.title.toString(),
//   })
// })

const searchResult = await search(db, {
  term: "Learn",
  properties: ["title"],
  threshold: 0.5,
})

console.log(
  searchResult.hits.map((hit) => hit.document),
  "results"
)
