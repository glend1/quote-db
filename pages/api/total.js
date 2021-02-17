import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let pageNumber = req.query.page;
  let display = 20;
  const data = await db
    .collection("collection")
    .find({})
    .toArray();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data.length));
};