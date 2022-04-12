const express = require("express");
const app = express();

app.set("view engine", "pug");
app.listen(9876);

app.get("/", (req, res) => {
    const data = require("./data/data.json");
    const grid_size = 8;

    var search = "";
    var page = 0;
    var page_total = 0;
    var img_arr = data.photos.photo;

    console.log("Search: ", req.query.search); console.log("Page: ", req.query.page);

    if (req.query.search == undefined && req.query.page == undefined) {
        page_total = Math.ceil(img_arr.length / grid_size) - 1;
        img_arr = img_arr.slice(0, grid_size);
    }

    if (req.query.search != undefined && req.query.page == undefined) {
        search = req.query.search;
        img_arr = img_arr.filter(item => item.title.toLowerCase().indexOf(search) > -1);
        page_total = Math.ceil(img_arr.length / grid_size) - 1;

        img_arr = img_arr.slice(0, grid_size);
    }

    if (req.query.search == undefined && req.query.page != undefined) {
        page = req.query.page;
        page_total = Math.ceil(img_arr.length / grid_size) - 1;

        var start = grid_size * page;
        img_arr = img_arr.slice(start, start + grid_size);
    }

    if (req.query.search != undefined && req.query.page != undefined) {
        search = req.query.search;
        page = req.query.page;
        img_arr = data.photos.photo.filter(item => item.title.toLowerCase().indexOf(search) > -1);
        page_total = Math.ceil(img_arr.length / grid_size) - 1;

        var start = grid_size * page;
        img_arr = img_arr.slice(start, start + grid_size);
    }

    console.log("Page Total: ", page_total);
    res.render("index", {
        title: "Image Gallery",
        img_arr: img_arr,
        search: search,
        page: page,
        page_total: page_total,
    });
});
