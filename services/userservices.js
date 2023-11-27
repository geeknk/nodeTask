const config = require("../config/constant");
const {User} = require("../models");
const {userToken} = require("../models");
const {address} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")
const axios = require("axios");
const Cheerio =require("cheerio");

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  requireTLS:true,
  auth:{
    user:"ernitish26@gmail.com",
    pass: config.EMAIL_PASS
  }
});

const getdata = async (id) => {
  try {
    return await User.findOne({include: address},{where:{id:id}});
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
};


const deleteuser = async (ID)=>{
    const data = await User.destroy({
      where: {
        id: ID
      }
    });
  if (data) {
    return true
  }
}

const updateuser1 = async (data, body_data)=>{
    await users.updateOne(data.email, body_data);
}

const matchpass = async (data) => {
    return data.password===data.new_password
}

const verifyemail = async (data) =>{
    const emailexist = await users.findOne({ email: data.email });

    if(emailexist){
    const token = jwt.sign(
        { email: emailexist.email, id: emailexist._id },
        config.ACCESS_TOKEN_SECRET,
        {expiresIn:config.FPASS_EXPIRESIN}
      );

      const mailOption ={
        from: config.EMAIL_FROM,
        to: config.EMAIL_TO,
        subject: "Password Reset Link",
        html: `<a href = "www.google.com">${token}</a>`
      }
      transporter.sendMail(mailOption);
      return token;
    }else{
        return false
    }
}

const modifyPass = async(email,data) =>{
    await users.updateOne(
        { email },
        {
            password: data.password,
        }
    ); 
    const mailOption ={
      from: config.EMAIL_FROM,
      to: config.EMAIL_TO,
      subject: "Password Reset",
      text: "Password Reset successfully"
    }
    transporter.sendMail(mailOption);
}

const userlogin = async(data) =>{
    const userData = await User.findOne({where: { email: data.email} });
    const pass = bcrypt.compare(userData.password , data.password)
    
    if(pass && userData){
        const accessToken = jwt.sign(
            { email: userData.email, id: userData.id },
            config.ACCESS_TOKEN_SECRET,
            {expiresIn:config.ACCESS_TOKEN_EXPIRES}
        );
        const refreshToken = jwt.sign({
            username: userData.email, id:userData.id, 
        }, config.REFRESH_TOKEN_SECRET, 
        { expiresIn: '1d' }); 
         
        await userToken.create({
          user_id:userData.id,
          token: accessToken,
          expiry: config.JWT_EXPIRES_IN
        });
        return {accessToken,refreshToken};
    }else{
        return false
    }
}

const usersignup = async(data) =>{
    let user = await User.create(data);
      if(user){
        const mailOption ={
          from: config.EMAIL_FROM,
          to: config.EMAIL_TO,
          subject: "Registration",
          text: "You Have been Registered successfully"
        }
        transporter.sendMail(mailOption);
        return user;
      }else{
        return false;
      }
};

const user_list = async (page)=>{
    const firstindex = (page - 1)*10;
    const lastindex = page *10;
    const data= await users.find();
    const sliced_data = data.slice(firstindex, lastindex);
    return sliced_data;
}

const useraddress = async (data,ID) => {
    try {
      address.sync();
      let userAdd = await address.create({
        user_id: ID,
        address: data.address,
        city: data.city,
        state: data.state,
        pin_code: data.pin_code,
        phone: data.phone
      });
      return userAdd
    } catch (error) {
      console.error(error)
    }
};

const flipkart = async ()=>{
  const movie = [];
  try{
  await axios.get(config.URL)
  .then((response)=>{
    let $ = Cheerio.load(response.data);
    $('._2n7i6c').each(function(el, index){
      const name = ($(this).find('a._2rpwqI').attr('title'));
      const price = ($(this).find('div._30jeq3').text());
      const link = ($(this).find('a.s1Q9rs').attr('href'));
      const rating = ($(this).find('div._3LWZlK').text());
      const discount = ($(this).find('div._3Ay6Sb').text().split(" ")[0]);

      movie.push({product_name:name, price:price, rating:rating, discount:discount, link:link})      
    });
  })}catch(error){
    console.log(error);
  }
  return movie
};

// Function to scrape the category page and get product URLs
async function scrapeCategoryPage(categoryUrl) {
  try {
    const response = await axios.get(categoryUrl);
    const productUrls = [];

    const $ = Cheerio.load(response.data);
    
    $('a.s1Q9rs').each((index, element) => {
      const productUrl = $(element).attr('href');
      productUrls.push(productUrl);
      console.log(productUrls);
    });

    return productUrls;
  } catch (error) {
    console.error('Error scraping category page:', error.message);
    throw error;
  }
}

const flipkartAll = async ()=>{

  const movie = [];
  try{
  await axios.get(config.URL1)
  .then((response)=>{
    let $ = Cheerio.load(response.data);
    $('._2kHMtA').each(function(el, index){
      const name = ($(this).find('._4rR01T').text());
      const productUrl = ($(this).find('a._1fQZEK').attr('href'));

      movie.push({product_name:name,link:productUrl})
    });
  })}catch(error){
    console.log(error);
  }
  return movie

};
const snapdeal = async ()=>{
  const Tshirt = []
  try{
  await axios.get(config.snapURL)
  .then((response)=>{
    let $ = Cheerio.load(response.data);
    $('.favDp.product-tuple-listing.js-tuple').each(function(el, index){
      const name = ($(this).find('p.product-title').attr('title'));
      const price = ($(this).find('span.product-price').text());
      const link = ($(this).find('a.dp-widget-link').attr('href'));
      const image = ($(this).find('img.product-image').attr('src'));
      const discount = ($(this).find('.product-discount span').text().split(" ")[0]);
      Tshirt.push({product_name:name, image:image, price:price, discount:discount, link:link})      
      console.log(Tshirt);
    });
  })}catch(error){
    console.log(error);
  }
  return Tshirt
};
const findByAggregate = async ()=>{

  //projection
  const data = await DummyData.aggregate([
    {$match: { country: 'Vietnam'}},
    {$project:{_id:0, name:1, email:1}}
  ])

 /* Skip & Sort Aggregate 
  const d = await DummyData.aggregate([
    {$group: { _id: '$country'}},
    {$sort: { _id:1 }} // 1 for ascending and 2 for descending
  ])

  const data = await DummyData.aggregate([
    {$count:'total'}
  ])
*/
  return data
}

module.exports={
    getdata,
    deleteuser,
    updateuser1,
    modifyPass,
    matchpass,
    verifyemail,
    user_list,
    userlogin,
    usersignup,
    useraddress,
    flipkart,
    flipkartAll,
    snapdeal,
    findByAggregate
}