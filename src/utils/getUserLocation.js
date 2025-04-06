export const getUserLocation = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error(
          "Geolocation is not supported on your device"
        )
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        err => {
          reject(err);
        },
        options
      );
    }
  });
};
