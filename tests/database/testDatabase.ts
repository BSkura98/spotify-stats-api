import getTrackPlaysMockData from "./mockedDatabaseData/getTrackPlaysMockData";

const getTrackPlays = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTrackPlaysMockData);
    }, 1000);
  });
};

export default {
  getTrackPlays,
};
