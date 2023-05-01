const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('CSE341W02').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341W02').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
// req is info for web request that came to me
//res response is what I am sending back
//next next controller to happen for the request, might not be one (are they logged in, where are they from, different checks. Can also handle errors, give user 404 page)
const create = async (req, res, next) => {
  console.log(req.body.firstName)
  if (req.body.firstName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("firstName is a required field");
  } else if (req.body.lastName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("lastName is a required field");
  } else if (req.body.email == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("email is a required field");
  } else if (req.body.favoriteColor == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("favoriteColor is a required field");
  } else if (req.body.birthday == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("birthday is a required field");
  } else {
    const result = await mongodb.getDb().db('CSE341W02').collection('contacts').insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    });
    // const db = mongodb.getDb();
    // const x = db.db('CSEwhatever');
    // const contacts = x.collection('contacts')
    // const result = contacts.insertOne()
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({id: result.insertedId});
  }
}

const modify = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  let fName, lName, email, fColor, bDay;
  let result = await mongodb.getDb().db('CSE341W02').collection('contacts').find({ _id: userId }).toArray();
  // collection.find
  if (result.length > 0){
    if (req.body.firstName == null){
      fName = result[0].firstName;
    // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("firstName is a required field");
    } else {
      fName = req.body.firstName;
    }
    if (req.body.lastName == null){
      lName = result[0].lastName;
      // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("lastName is a required field");
    } else {
      lName = req.body.lastName;
    }
    if (req.body.email == null){
      email = result[0].email;
      // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("email is a required field");
    } else{
      email = req.body.email
    }
    if (req.body.favoriteColor == null){
      fColor = result[0].favoriteColor;
    //   res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("favoriteColor is a required field");
    } else{
      fColor = req.body.favoriteColor;
    }
    if (req.body.birthday == null){
      bDay = result[0].birthday;
    //   res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("birthday is a required field");
    } else {
      bDay = req.body.birthday;
    }
     result = await mongodb.getDb().db('CSE341W02').collection('contacts').updateOne({_id: userId},
      {
      $set: {firstName: fName,
       lastName: lName,
       email: email,
       favoriteColor: fColor,
       birthday: bDay},
      });
    res.setHeader('Content-Type', 'application/json');
    res.status(204).json("Documents modified:" + result.modifiedCount);
  }else{

  }
}
const deleteOne = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const checkID = await mongodb.getDb().db('CSE341W02').collection('contacts').find({ _id: userId }).toArray();
  if(checkID.length > 0)
  {
    const result = await mongodb.getDb().db('CSE341W02').collection('contacts').deleteOne({_id: userId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
}


module.exports = { getAll, getSingle, create, modify, deleteOne};
