var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/hello')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));


var schemaUsers = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


var schemaProd = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, default: 0 }
});

var Users = mongoose.model("users", schemaUsers);
var Prod = mongoose.model("prod", schemaProd);


app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var user1 = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    await user1.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(400).json({ message: "Error creating user" });
    }
  }
});



app.post('/api/products', async (req, res) => {
    try {
      if (!req.body.name || !req.body.price) {
        return res.status(400).json({ message: "Name and price are required" });
      }
  
      var product = new Prod({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
      });
  
      await product.save();
      res.status(200).json({ message: "Product added successfully" });
    } catch (err) {
      console.error("Error adding product:", err); 
      res.status(400).json({ message: "Error adding product" });
    }
  });
  

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await Prod.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ message: "Error fetching product" });
    }
  });
  
app.get('/api/products', async (req, res) => {
  try {
    const products = await Prod.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: "Error fetching products" });
  }
});





app.post('/api/products', async (req, res) => {
  try {
    var products = new Prod({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock
    });

    await products.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error adding product" });
  }
});


app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Prod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error updating product" });
  }
});


app.delete('/api/products/:id', async (req, res) => {
  try {
    await Prod.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting product" });
  }
});

app.listen('3000', () => {
  console.log("Server is running at port 3000.....");
});


