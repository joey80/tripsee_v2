export const saveToLocalStorage = state => {
  console.log('saveToLocalStorage', state);
  localStorage.setItem('tripsee', JSON.stringify(state));
};

export const somethingelse = () => null;
