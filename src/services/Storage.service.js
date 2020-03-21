export const saveToLocalStorage = state => {
  localStorage.setItem('tripsee', JSON.stringify(state));
};

export const somethingelse = () => null;
