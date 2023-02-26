import { connectToDatabase } from "../../util/mongodb";
import { verifyToken } from "../../util/server.firebase-auth";

const noSpecialCharacterRegex = (string) => /[^A-Za-z0-9]/.test(string)

export default async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    try {
        const body = req.body
        if (body.quote === "") { throw "Quote not defined" }
        if (noSpecialCharacterRegex(body.quote)) { throw "Quote must not contain special characters" }
        if (body.author === "") { throw "Author not defined" }
        if (noSpecialCharacterRegex(body.author)) { throw "Author must not contain special characters" }
        const token = await verifyToken(body.token)
        if (token.uid !== process.env.ADMIN_ID) { throw "Unauthorized user" }
        const doc = { quote: body.quote, author: body.author };
        const { db } = await connectToDatabase();
        const result = await db.collection("collection").insertOne(doc);
        res.end(JSON.stringify(result.insertedId));
    } catch (e) {
        res.end(JSON.stringify(e));
    }
};