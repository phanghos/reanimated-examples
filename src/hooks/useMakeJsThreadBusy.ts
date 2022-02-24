export const useMakeJsThreadBusy = () => {
  for (let i = 0; i < 1000000000000; i++) {
    for (let j = 0; j < 1000000000000; j++) {
      for (let k = 0; k < 1000000000000; k++) {
        const _result = i + j + k;
      }
    }
  }
};
