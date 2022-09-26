import { connectToDatabase } from "../../util/mongodb";

export default async function Random (req, res) {
  const { db } = await connectToDatabase();
  const data = await db.collection("collection").aggregate([ { $sample: { size: 1 } } ]).toArray();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};