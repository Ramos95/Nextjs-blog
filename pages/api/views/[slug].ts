import type { NextApiRequest, NextApiResponse } from "next";
import db from "lib/firbase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return GetViews(req, res);
    case "POST":
      return PostViews(req, res);
  }

  return res.status(400).send("Method not allowed");
}

const GetViews = async (req: NextApiRequest, res: NextApiResponse) => {
  const snapshot = await db
    .collection("views")
    .doc(req.query.slug as string)
    .get();
  const views = snapshot.data()?.value;

  return res.status(200).json({ total: views || 0 });
};

const PostViews = async (req: NextApiRequest, res: NextApiResponse) => {
  const docRef = await db.collection("views").doc(req.query.slug as string);
  const document = await docRef.get();

  if (!document.data()?.value) {
    await docRef.set({ value: 1 });
  } else {
    await db.runTransaction(async (transaction) => {
      return transaction.get(docRef).then((doc) => {
        transaction.update(docRef, {
          value: Number(doc.data()?.value || 0) + 1,
        });
      });
    });
  }

  const getCurrentViews = (await docRef.get()).data();

  return res.status(200).json({ total: getCurrentViews?.value });
};
