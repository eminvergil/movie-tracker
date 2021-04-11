import faker from "faker";
import { Dimensions } from "react-native";

faker.seed(10);

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const ARRAY_LENGTH = 30;

// key , name
export const DATA = [...Array(ARRAY_LENGTH).keys()].map((_, i) => {
  return {
    key: faker.random.uuid() + i,
    name: faker.name.firstName(),
  };
});

export const BG_IMG = `https://images.pexels.com/photos/40465/pexels-photo-40465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;

export const SET_DATA = (movie_data, watched_movie_data) => {};

export const SET_CLICK = (movie_data, watched_movie_data, length) => {
  let _filtered = movie_data.filter((x) => x.key == watched_movie_data.key);

  return _filtered;
};
