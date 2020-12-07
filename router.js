const Item = require("./models/item");
const Index = require("./models/index");

module.exports = function (app) {
  app.get("/items", function (req, res, next) {
    Item.find({}, (err, docs) => {
      if (err) return next(err);
      res.json(docs);
      console.log("hello world");
    });
  });
  app.post("/items", async (req, res, next) => {
    let currentIndex = await Index.findOne({ name: "all" });

    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      category: req.body.category,
      image: req.body.imageToUpload,
      indexForAll: currentIndex.counter * 1000,
      indexForCategory: currentIndex.counter * 1000,
    });
    item.save((err) => {
      if (err) return next(err);
      currentIndex.counter++;
      currentIndex.save();
      Item.find({}, (err, docs) => {
        if (err) return next(err);
        res.json(docs);
        currentIndex.counter++;
        currentIndex.save();
      });
    });
  });
  app.delete("/items", (req, res, next) => {
    Item.findByIdAndDelete(req.body.id, function (err) {
      if (err) return next(err);
      Item.find({}, (err, docs) => {
        if (err) return next(err);
        return res.json(docs);
      });
    });
  });
  app.put("/items", (req, res, next) => {
    console.log(req.body);
    Item.findByIdAndUpdate(req.body.id, req.body.updateInfo, (err, doc) => {
      if (err) return next(err);
      console.log(doc);
      res.send("Successfully updated");
    });
  });
  app.get("/", (req, res, next) => {
    res.send("test done");
  });
  // app.post("/manual", (req, res, next) => {
  //   const index = new Index({
  //     name: "all",
  //     counter: 1,
  //   });
  //   index.save((err) => {
  //     if (err) next(err);
  //     res.send("index saved");
  //   });
  // });
};
