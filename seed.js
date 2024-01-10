const mongoose = require('mongoose');

const Product= require('./models/Product');
const products=[
    {   name:"iphone 12",
        img:"https://cdn.ithinkdiff.com/wp-content/uploads/2023/02/iPhone-15-Pro-colors.jpg",
        price: 400,
        desc:"best performance"
        },
    {
        name:"Samsung",
        img:"https://th.bing.com/th/id/OIP.6ZHxJ38Xv-PJsV206dv2UQHaFk?pid=ImgDet&rs=1",
        price:40230,
        desc:'best camera'

    },
    {
        name:"Samsung plus",
        img:"https://th.bing.com/th/id/OIP.6ZHxJ38Xv-PJsV206dv2UQHaFk?pid=ImgDet&rs=1",
        price: 350,
        desc:'best sound'

    },
    {
        name:"Samsung",
        img:"https://th.bing.com/th/id/OIP.6ZHxJ38Xv-PJsV206dv2UQHaFk?pid=ImgDet&rs=1",
        price: 350,
        desc:'best camera'
    },
    {
        name:"Samsung ultra 20",
        img:"https://th.bing.com/th/id/OIP.-9dFSCb_lvhnEw-ntbwsRQHaHa?pid=ImgDet&rs=1",
        price: 350,
        desc:'best camera'
    },
    {
        name:"Samsung ultra 20",
        img:" https://th.bing.com/th/id/OIP.TnABHCA2imV7EyWfjLH2HQHaHa?pid=ImgDet&rs=1",
        price:4000,
        desc:'best processesor'
    }
]

async function seedDB(){
   await Product.insertMany(products);
    console.log("data sedded succesfully");
}

module.exports = seedDB;