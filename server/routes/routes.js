import { Router } from "express"

import { getCollection, getEstate } from "../controllers/estate.js"
import { getReviews } from "../controllers/reviews.js"
import { getFAQS } from "../controllers/faqs.js"

const router = new Router()

router.get("/estate/properties/:id", async (req, res) => {
    return getEstate(req, res)
})

router.get("/estates", async (req, res) => {
   return getCollection(req,res)
})

router.get("/reviews", async (req, res) => {
    return getReviews(req,res)
})

router.get("/faqs", async (req, res) => {
    return getFAQS(req,res)
})

export default router