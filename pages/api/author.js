import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let query = {"author": req.query.name };
  let pageNumber = req.query.page;
  if (!pageNumber) {
    /*data = await db
      .collection("collection")
      .find(query)
      .toArray();*/
  } else if (pageNumber.toLowerCase() == "total" ) {
    /*data = await db
      .collection("collection")
      .count(query);*/
  } else {
    let display = 20;
    const find = await db
      .collection("collection")
      .find(query);
    const pages = Math.ceil((await find.count()) / 20);
    const data = await find.skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * display ) : 0 )
      .limit( display )
      .toArray();
      res.status(200).json({pages, data})
  }
  /*res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));*/
};