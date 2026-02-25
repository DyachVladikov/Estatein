import { Router } from "express"

import { getCollection, getEstate } from "../controllers/estate.js"
import { getReviews } from "../controllers/reviews.js"
import { getFAQS } from "../controllers/faqs.js"
import { setEmails } from "../controllers/emails.js"
import { getEmployee } from "../controllers/employees.js"
import { getClientCard } from "../controllers/clients.js"

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
router.post("/emails", async (req, res) => {
    return setEmails(req,res)
})
router.get("/employees", async (req, res) => {
    return getEmployee(req,res)
})
router.get("/clients", async (req, res) => {
    return getClientCard(req,res)
})

export default router