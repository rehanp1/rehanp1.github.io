//mongosh in cmd
// show dbs
// use <dbname>
// exit
// show collections
// db.<collectionName>.insertOne({})
// db.<collectionName>.insertMany([])
// db.<collectionName>.find()
// db.<collectionName>.findOne()
// db.<collectionName>.drop()
// db.<collectionName>.find().skip(N)
// db.<collectionName>.find().limit(N)
// db.<collectionName>.find().skip(N).limit(N)
// db.<collectionName>.find().sort({name: 1})   ASC sort by name field  ASC 1, DESC -1
// db.<collectionName>.find({}, {name: 1})  It shows only name field SHOW 1, HIDE 0
// db.<collectionName>.find().count()
// db.<collectionName>.countDocuments()
// db.<collectionName>.find({}, {EmpName: "$name"}) display name field as EmpName

// ---------------------------------------------------------------------------------------------------

// db.employees.find({ department: { $eq: "IT" } });
// db.employees.find({ salary: { $gt: 3000 } });
// db.employees.find({ salary: { $gte: 3000 } });
// db.employees.find({ salary: { $lt: 3000 } });
// db.employees.find({ salary: { $lte: 3000 } });
// db.employees.find({ salary: { $ne: 3000 } });
// db.employees.find({ salary: { $gte: 3000 }, department: { $eq: "IT" } });

// db.employees.find().sort({ salary: -1 }).limit(2);

// db.employees.find({
//   $and: [
//     { salary: { $gte: 3000 } },
//     { department: { $eq: "IT" } }
//   ],
// });

// -----------------------------------------------------------------------

db.employees.updateOne({ email: "john@gmail.com" }, { $set: { salary: 2000 } });
db.employees.updateMany({}, { $set: { points: 1 } }); // Right now there is no points field, by updateMany it will create it and set as 1
db.employees.updateMany({ department: "IT" }, { $inc: { points: 1 } });
db.employees.updateMany({}, { $rename: { points: "score" } });
db.employees.updateMany({}, { $unset: { score: "" } }); // Removes score field
db.employees.updateMany(
  { email: "john@gmail.com" },
  { $push: { skills: "MERN" } }
); // Right now there is no skills field, but it will create skills field as an array and push value in it

db.employees.updateMany(
  { email: "john@gmail.com" },
  { $pull: { skills: "C++" } }
);

db.employees.updateMany(
  { email: "john@gmail.com" },
  { $addToSet: { skills: "MERN" } }
); // It stores unique values in an array

db.employees.updateMany({ email: "john@gmail.com" }, { $pop: { skills: 1 } }); //Removes last value (1) from skills array, first value (-1)

db.employees.updateOne(
  { email: "brain@gmail.com" },
  { $set: { name: "Brian" } },
  { upsert: true }
); // If email match it will update it, If not then insert it

db.employees.deleteOne({ email: "brain@gmail.com" });
db.employees.deleteMany({ email: "brain@gmail.com" });

// -------------------------------------------------------------------------------------------

db.employees.getIndexes();

db.employees.createIndex({ email: 1 });

db.employees.dropIndex("email_1");

db.employees.find({ email: "john@gmail.com" }).explain("executionStats"); //It shows query performance

// --------------------------------------------------------------------------------------------------
// Aggregation Pipeline: It find result on bases of first query then it apply second query on result what we got from first query. That's why it best performance
db.employees.aggregate([
  { $match: { department: "IT" } },
  { $project: { name: 1, department: 1, salary: 1, location: 1 } },
  { $sort: { salary: 1 } },
  { $limit: 2 },
]);

db.employees.aggregate([
  { $group: { _id: "$department", total: { $sum: "$salary" } } },
]);

db.employees.aggregate([
  {
    $project: {
      name: 1,
      bonus: { $multiply: ["$salary", 2] },
    },
  },
]);

db.employees.aggregate([
  { $match: { department: "IT" } },
  { $project: { _id: 0, name: 1, email: 1, salary: 1 } },
]);

db.employees.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      annualSalary: { $multiply: ["$salary", 12] },
    },
  },
]);

db.employees.aggregate([
  { $match: { salary: { $gt: 3000 } } },
  { $project: { name: 1, CTC: "$salary" } },
]);

db.students.insertMany([
  { name: "Tom", age: 22 },
  { name: "Sara", age: 24 },
  { name: "Mike", age: 21 },
]);

// ------------------------------------------------------
//Questions

db.students.aggregate([{ $group: { _id: null, average: { $avg: "$age" } } }]);

db.students.updateOne({ name: "Alice Johnson" }, { $set: { age: 24 } });

db.students.updateMany({}, { $addToSet: { courses: "Chemistry" } });

db.students.updateMany({}, { $inc: { age: 1 } });

db.students.find({}, { _id: 0, name: 1, age: 1 });

db.students.updateOne(
  { name: "Alice Johnson" },
  { $pull: { courses: "Physics" } }
);

// ------------------------------------------------------------------

db.address.insertMany([
  {
    student_id: ObjectId("685cdc91cfe1ecb75dceec78"),
    city: "Texas",
    country: "USA",
  },
  {
    student_id: ObjectId("685cdd11cfe1ecb75dceec79"),
    city: "California",
    country: "Canada",
  },
  {
    student_id: ObjectId("685cdd11cfe1ecb75dceec7a"),
    city: "New York",
    country: "USA",
  },
  {
    student_id: ObjectId("685cdd11cfe1ecb75dceec7b"),
    city: "London",
    country: "Europe",
  },
]);

//Joins 2 collections using $lookup

db.students.aggregate([
  {
    $lookup: {
      from: "address",
      localField: "_id",
      foreignField: "student_id",
      as: "address",
    },
  },
  { $unwind: "$address" },
  { $project: { name: 1, "address.city": 1, "address.country": 1 } },
]);
