import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let query = {"author": req.query.search[0] };
  let pageNumber = req.query.search[1];
  let data;
  if (!pageNumber) {
    data = await db
      .collection("collection")
      .find(query)
      .toArray();
  } else if (pageNumber.toLowerCase() == "total" ) {
    data = await db
      .collection("collection")
      .count(query);
  } else {
    let display = 20;
    data = await db
      .collection("collection")
      .find(query)
      .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * display ) : 0 )
      .limit( display )
      .toArray();
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};