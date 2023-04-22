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
    // const result = contacts.insertone()


    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({id: result.insertedId});
  }


}
module.exports = { getAll, getSingle, create };
