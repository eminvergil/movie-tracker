import faker from "faker";
import { Dimensions } from "react-native";

faker.seed(10);

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const ARRAY_LENGTH = 10;

// key , name
export const DATA = [...Array(ARRAY_LENGTH).keys()].map((_, i) => {
  return {
    key: faker.random.uuid() + i,
    name: faker.name.firstName(),
  };
});

export const BG_IMG = `https://images.pexels.com/photos/40465/pexels-photo-40465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
