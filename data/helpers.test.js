import DATA from "./context-filmovie.json";
import WATCHED from "./watched.json";

const x = {
  key: "The-xnbp27",
  title: "The Eight Hundred",
  description:
    "From the acclaimed filmmaker behind Mr. Six comes a riveting war epic. In 1937, eight hundred Chinese soldiers fight under siege from a warehouse in the middle of the Shanghai battlefield, completely surrounded by the Japanese army.",
  image:
    "https://m.media-amazon.com/images/M/MV5BNTZiYWFlZTItNjQ5ZC00YjQ1LWI1MjItMWVlNWYwM2Y5Mzk3XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SY139_CR1,0,92,139_.jpg",
  release_date: "Aug 28, 2020",
  "empty-col": "123",
};

const SET_CLICK = (movie_data, watched_movie_data, length) => {
  let _filtered = movie_data.filter((x) => x.key == "The-xnbp27");

  return _filtered[0];
};

var filteredArray = DATA.filter(function (array_el) {
  return (
    WATCHED.filter(function (anotherOne_el) {
      return anotherOne_el.key == array_el.key;
    }).length == 0
  );
});

test("movie data  filter test", () => {
  expect(filteredArray).toStrictEqual("");
});

// const sum = (x, y) => {
//   return x + y;
// };

// test("sum test", () => {
//   expect(sum(2, 3)).toBe(5);
// });
