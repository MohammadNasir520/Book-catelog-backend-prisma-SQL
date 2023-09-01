export const asyncForEach = async (array: any[], callBack: any) => {
  if (!Array.isArray(array)) {
    throw new Error('expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callBack(array[index], index, array);
  }
};
