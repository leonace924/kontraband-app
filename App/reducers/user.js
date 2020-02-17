const initialState = {
  loggedInUser: null,
  selectedLanguage: null,
  selectedCityId: 1,
  selectedCityName:'',
  exchangeData: null,
  pendingCartId: -1,
  firstName: null,
  lastName: null,
  totalCartAmount: 0
};

const user = (state = {initialState}, action) => {
  return {...state, action};
};
export default user;