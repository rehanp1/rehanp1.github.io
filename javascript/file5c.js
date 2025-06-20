// let demo = () => {
//   console.log("This is cb function");
// };

// const main = (cb) => {
//   cb();
// };

// main(demo);

// const main = (cb) => {
//   cb();
// };

// main(() => {
//   console.log("This is demo");
// });

let f1 = (x) => {
  console.log(x);
};

const main = () => f1(5);
main();
