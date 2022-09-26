import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let pageNumber = req.query.page;
  let display = 20;
  const find = await db
    .collection("collection")
    .find({});
    const pages = Math.ceil((await find.count()) / 20);
  if (pageNumber <= pages) {
    const data = await find.skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * display ) : 0 )
    .limit( display )
    .toArray();
    res.status(200).json({pages, data})
  } else {
    res.status(404).json({ message: `Page ${pageNumber} out of range.` })
  }
};