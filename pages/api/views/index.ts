// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from "lib/firbase"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const snapshot = (await db.collection("views").get()).docs
  const views = snapshot.length ? snapshot.map((snap)=>snap.data().value) : [0]

  return res.status(200).json({
      total: views.reduce((prev,current)=> prev+current) 
  })
}
