import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db.collection("collection").aggregate([
    {"$group" : {_id:"$author", count:{$sum:1}}},
    {$project: { _id: 0, author: "$_id", count: 1} }
  ]).toArray();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};