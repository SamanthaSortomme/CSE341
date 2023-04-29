// this is where I would do same database stuff for contacts, do for movies here. Do the CRUD and it's good to go

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('CSE341W02').collection('movies').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341W02').collection('movies').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
// req is info for web request that came to me
//res response is what I am sending back
//next next controller to happen for the request, might not be one (are they logged in, where are they from, different checks. Can also handle errors, give user 404 page)
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
  const userId = new ObjectId(req.params.id);
  let mTitle, rYear, language, mLength, rat;
  let result = await mongodb.getDb().db('CSE341W02').collection('movies').find({ _id: userId }).toArray();
  // collection.find
  if (result.length > 0){
    if (req.body.movieTitle == null){
      mTitle = result[0].movieTitle;
    // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("movieTitle is a required field");
    } else {
      mTitle = req.body.movieTitle;
    }
    if (req.body.releaseYear == null){
      rYear = result[0].releaseYear;
      // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("releaseYear is a required field");
    } else {
      rYear = req.body.releaseYear;
    }
    if (req.body.language == null){
      language = result[0].language;
      // res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("language is a required field");
    } else{
      language = req.body.language
    }
    if (req.body.movieLength == null){
      mLength = result[0].movieLength;
    //   res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("movieLength is a required field");
    } else{
      mLength = req.body.movieLength;
    }
    if (req.body.rating == null){
      rat = result[0].rating;
    //   res.setHeader('Content-Type', 'application/json');
    // res.status(400).json("rating is a required field");
    } else {
      rat = req.body.rating;
    }
    if (req.body.specialFeatures == null){
        sFeat = result[0].specialFeatures;
      //   res.setHeader('Content-Type', 'application/json');
      // res.status(400).json("specialFeatures is a required field");
      } else {
        sFeat = req.body.specialFeatures;
      }
      if (req.body.boxOfficeGross == null){
        gross = result[0].boxOfficeGross;
      //   res.setHeader('Content-Type', 'application/json');
      // res.status(400).json("boxOfficeGross is a required field");
      } else {
        gross = req.body.boxOfficeGross;
      }
     result = await mongodb.getDb().db('CSE341W02').collection('movies').updateOne({_id: userId},
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
  }else{

  }
}
const deleteOne = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const checkID = await mongodb.getDb().db('CSE341W02').collection('movies').find({ _id: userId }).toArray();
  if(checkID.length > 0)
  {
    const result = await mongodb.getDb().db('CSE341W02').collection('movies').deleteOne({_id: userId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json("Documents deleted:" + result.deletedCount);
  };
}


module.exports = { getAll, getSingle, create, modify, deleteOne};
