const express = require("express")
const app = express()

// 花括號寫法
const { engine } = require('express-handlebars')

// 如果不用花括號，就必須用下面寫法
// const exphbs  = require('express-handlebars')
// const engine = exphbs.engine

const port = 3000
const movies = require("./public/jsons/movies.json").results
const image_url = "https://movie-list.alphacamp.io/posters/"


app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')


app.use(express.static("public"))


app.get("/", (req, res) => {
    res.redirect("/movies")
})


app.get("/movies", (req, res) => {
    const keyword = req.query.search
    const filter_movies = keyword ? movies.filter(movie => Object.values(movie).some(property => {
        if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase())
        }
    })  
    ) : movies

    res.render("index", { movies: filter_movies, image_url, keyword })
})


app.get("/movie/:id", (req, res) => {
    const id = Number(req.params.id)
    const movie = movies.find((movie) => movie.id === id)
    res.render("detail", { movie, image_url })
})


app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
})
