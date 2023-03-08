let router = require("express").Router();
const newsController=require("../controllers/newsApi")


router.get("/news",newsController)

module.exports = router;
