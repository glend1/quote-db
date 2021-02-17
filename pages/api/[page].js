import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let pageNumber = req.query.page;
  let display = 20;
  const data = await db
    .collection("collection")
    .find({})
    .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * display ) : 0 )
    .limit( display )
    .toArray();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};