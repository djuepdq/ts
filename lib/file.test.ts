import { expect, test } from "bun:test";
import { writeContentToSrcData } from "./file";

test("save array of JSON in ~/src/data", async () => {
  const arrayObject = [{
    value: "test"
  }, {
    value: "another value"
  }]
  console.log("run!!")
  const res = await writeContentToSrcData(arrayObject, "test-array.json")
  console.log(res)
  expect(2 + 2).toBe(5);

  // expect(2 + 2).toBe(4);
});
