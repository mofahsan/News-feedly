const axios = require("axios")
const cron = require("node-cron");
require("dotenv").config()
const newsModel = require("../models/newsApiModel")

//news will be fetched at 3 AM when the server load is expected to be low
cron.schedule("0 3 * * *", async () =>{
    console.log("---------------------");
    console.log("Running Cron Job for fetching news articles");
    newsapiorg()
    gnews()
    console.log("news articles fetched")
});


const newsapiorg =async()=>{
    let data = await axios.get(`https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=${process.env.NEWS_API_ORG_KEY}`).catch((err)=>{
        console.log(`newsapi failed ${err.message}`)
    })

    data = data.data.articles

    //transforming data for our db model
    data=data.map((data)=>{
    return {
        title:data.title,
        description:data.description,
        content:data.content,
        newsUrl:data.url,
        image:data.urlToImage,
        date:data.publishedAt,
        apiname:"newsapiorg"
    }
})

await newsModel.insertMany(data)
}

const gnews = async()=>{
    let data = await axios.get(`https://gnews.io/api/v4/search?q=example&token=${process.env.GNEWS_API_KEY}&lang=en&country=us&max=10`).catch((err)=>{
        console.log(`Gnews api failed ${err.message}`)
    })
    data = data.data.articles

     //transforming data for our db model
    data=data.map((data)=>{
        return {
            title:data.title,
            description:data.description,
            content:data.content,
            newsUrl:data.url,
            image:data.image,
            date:data.publishedAt,
            apiname:"gnews"
        }
    })

await newsModel.insertMany(data)

}
newsapiorg()
gnews()





