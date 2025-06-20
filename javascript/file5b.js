//In arrow func there is not Hoisting concept and arguments keyword

// const greet = () => {
//   console.log("Good Morning");
// };
// greet();

// const add = (a, b) => {
//   return a + b;
// };
// console.log(add(4, 5));

const add = (...args) => {
  // no arguments keyword works
  console.log(args);
};
add(4, 5);
