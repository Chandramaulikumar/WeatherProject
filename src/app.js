const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000;

// static path create
const staticPath = path.join(__dirname, "../public");

// Create templates path
const templatePath = path.join(__dirname, "../templates/views");
// Create partial path
const partialPath = path.join(__dirname, "../templates/partials");
// set the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
// Register the partials
hbs.registerPartials(partialPath);

// Use the css path
app.use(express.static(staticPath));

// Routing create
app.get("", (req, res) => {
    res.render("Index");
});
app.get("/about", (req, res) => {
    res.render("About");
});
app.get("/weather", (req, res) => {
    res.render("Weather");
});
// app.get("/about/*", (req, res) => {
//     res.render("404error", {
//         errorMsg: `Opps! Page Not Found`,
//     });
// });
// app.get("/weather/*", (req, res) => {
//     res.render("404error", {
//         errorMsg: `Opps! Page Not Found`,
//     });
// });
app.get("*", (req, res) => {
    res.render("404error", {
        errorMsg: `Opps! Page Not Found`,
    });
});
app.listen(port, () => {
    console.log(`Listening the port number ${port}`);
});