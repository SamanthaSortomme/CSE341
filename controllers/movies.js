// this is where I would do same database stuff for contacts, do for movies here. Do the CRUD and it's good to go

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('CSE341W02').collection('movies').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341W02').collection('movies').find({ _id: movieId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
// req is info for web request that came to me
//res response is what I am sending back
//next next controller to happen for the request, might not be one (are they logged in, where are they from, different checks. Can also handle errors, give user a 404 page)
const create = async (req, res, next) => {
  console.log(req.body.movieTitle)
  if (req.body.movieTitle == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("movieTitle is a required field");
  } else if (req.body.releaseYear == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("releaseYear is a required field");
  } else if (req.body.language == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("language is a required field");
  } else if (req.body.movieLength == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("movieLength is a required field");
  } else if (req.body.rating == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("rating is a required field");
} else if (req.body.specialFeatures == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("specialFeatures is a required field");
} else if (req.body.boxOfficeGross == null){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("boxOfficeGross is a required field");
  } else {
    const result = await mongodb.getDb().db('CSE341W02').collection('movies').insertOne({
      movieTitle: req.body.movieTitle,
      releaseYear: req.body.releaseYear,
      language: req.body.language,
      movieLength: req.body.movieLength,
      rating: req.body.rating,
      specialFeatures: req.body.specialFeatures,
      boxOfficeGross: req.body.boxOfficeGross
    });
    // const db = mongodb.getDb();
    // const x = db.db('CSEwhatever');
    // const movies = x.collection('movies')
    // const result = movies.insertOne()
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({id: result.insertedId});
  }
}


const modify = async (req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() })
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


  let mTitle, rYear, language, mLength, rat;
  let result = await mongodb.getDb().db('CSE341W02').collection('movies').find({ _id: movieId }).toArray();
  // collection.find
  if (result.length == 0){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json("There is no movie with that ID");
    return
  }
  result = result[0]
  if (req.body.movieTitle == null){
    mTitle = result.movieTitle;
  // res.setHeader('Content-Type', 'application/json');
  // res.status(400).json("movieTitle is a required field");
  } else {
    mTitle = req.body.movieTitle;
  }
  if (req.body.releaseYear == null){
    rYear = result.releaseYear;
    // res.setHeader('Content-Type', 'application/json');
  // res.status(400).json("releaseYear is a required field");
  } else {
    rYear = req.body.releaseYear;
  }
  if (req.body.language == null){
    language = result.language;
    // res.setHeader('Content-Type', 'application/json');
  // res.status(400).json("language is a required field");
  } else{
    language = req.body.language
  }
  if (req.body.movieLength == null){
    mLength = result.movieLength;
  //   res.setHeader('Content-Type', 'application/json');
  // res.status(400).json("movieLength is a required field");
  } else{
    mLength = req.body.movieLength;
  }
  if (req.body.rating == null){
    rat = result.rating;
  //   res.setHeader('Content-Type', 'application/json');
  // res.status(400).json("rating is a required field");
  } else {
    rat = req.body.rating;
  }
  if (req.body.specialFeatures == null){
      sFeat = result.specialFeatures;
    //   res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("specialFeatures is a required field");
    } else {
      sFeat = req.body.specialFeatures;
    }
    if (req.body.boxOfficeGross == null){
      gross = result.boxOfficeGross;
    //   res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("boxOfficeGross is a required field");
    } else {
      gross = req.body.boxOfficeGross;
    }
    result = await mongodb.getDb().db('CSE341W02').collection('movies').updateOne({_id: movieId},
    {
    $set: {movieTitle: mTitle,
      releaseYear: rYear,
      language: language,
      movieLength: mLength,
      rating: rat,
      specialFeatures: sFeat,
      boxOfficeGross: gross
  },
    });
  res.setHeader('Content-Type', 'application/json');
  res.status(204).json("Documents modified:" + result.modifiedCount);
}

const deleteOne = async (req, res, next) => {
  const movieId = new ObjectId(req.params.id);
  const checkID = await mongodb.getDb().db('CSE341W02').collection('movies').find({ _id: movieId }).toArray();
  if(checkID.length > 0)
  {
    const result = await mongodb.getDb().db('CSE341W02').collection('movies').deleteOne({_id: movieId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
}


module.exports = { getAll, getSingle, create, modify, deleteOne};
