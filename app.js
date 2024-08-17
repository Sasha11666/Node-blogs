const express = require("express"); // returns a function
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// create an instance of express app
const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://basova087:JTitw13$@nodeblogs.1w941.mongodb.net/nodeblogs?retryWrites=true&w=majority&appName=nodeblogs";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000)) //listen for requests
  .catch((err) => console.log(err));

//set EJS as the view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "Cold Embrace",
//     snippet: "About those behind the mirror glass",
//     body: "What happens when you choose to hide in your dreams instead of facing the reality and making the most out of what you have? You disappear in the real world. But maybe sometimes dream world can give you more than a real one?",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

app.use((req, res, next) => {
  console.log("New request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("mathod", req.method);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
  // const blogs = [
  //   {
  //     title: "Wildflowers",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ab.",
  //   },
  //   {
  //     title: "In The Woods",
  //     snippet:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, aspernatur.",
  //   },
  //   {
  //     title: "TWTE",
  //     snippet:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, maiores.",
  //   },
  // ];
  // res.sendFile("./views/index.html", { root: __dirname });
  // res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
