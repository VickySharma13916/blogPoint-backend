const express = require("express");
const { getSearchResult } = require("../controllers/searchResult");
const router = express.Router();

router.get("/", getSearchResult);

module.exports = router;
