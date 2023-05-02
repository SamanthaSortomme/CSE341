
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('CSE341W02').collection('actors').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341W02').collection('actors').find({ _id: movieId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const create = async (req, res, next) => {
  if (req.body.firstName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("firstName is a required field");
  } else if (req.body.lastName == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("lastName is a required field");
  } else if (req.body.moviesIn == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("moviesIn is a required field");
  } else {
    const result = await mongodb.getDb().db('CSE341W02').collection('actors').insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      moviesIn: req.body.moviesIn
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({id: result.insertedId});
  }
}

const modify = async (req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ errors: errors.array() });
    return
  }
  let movieId = null
  try {
    movieId = new ObjectId(req.params.id);
  } catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("This is not a valid ID format")
    return
  }

  let firstName, lastName, moviesIn;
  let result = await mongodb.getDb().db('CSE341W02').collection('actors').find({ _id: movieId }).toArray();
  // collection.find
  if (result.length == 0){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("There is no movie with that ID");
    return
  }
  result = result[0]
  if (req.body.firstName == null){
    firstName = result.firstName;

  } else {
    firstName = req.body.firstName;
  }
  if (req.body.lastName == null){
    lastName = result.lastName;

  } else {
    lastName = req.body.lastName;
  }
  if (req.body.moviesIn == null){
    moviesIn = result.moviesIn;

  } else{
    moviesIn = req.body.moviesIn
  }

  result = await mongodb.getDb().db('CSE341W02').collection('actors').updateOne({_id: movieId},
  {
  $set: {firstName: firstName,
    lastName: lastName,
    moviesIn: moviesIn
  },
    });
  res.setHeader('Content-Type', 'application/json');
  res.status(204).json("Documents modified:" + result.modifiedCount);
}

const deleteOne = async (req, res, next) => {
  const movieId = new ObjectId(req.params.id);
  const checkID = await mongodb.getDb().db('CSE341W02').collection('actors').find({ _id: movieId }).toArray();
  if(checkID.length > 0)
  {
    const result = await mongodb.getDb().db('CSE341W02').collection('actors').deleteOne({_id: movieId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
}

module.exports = { getAll, getSingle, create, modify, deleteOne};
