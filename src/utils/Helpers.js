export const LimitTitleLength = str => {
  const array = str.split('');
  const partialArray = array.slice(0, 27);
  return array.length <= 27 ? partialArray.join('') : `${partialArray.join('')}...`;
};
