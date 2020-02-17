const initialState = {
  age: 20,
  appHasError: false,
  errorMessage: null,
  isLoading: false,
  isHomeLoading: false,
  isHomeLoaded: false,
  serverError: "Something went wrong with server"
};

const appState = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "AGE_UP_ASYNC":
      newState.age += action.value;
      break;

    case "AGE_DOWN":
      newState.age -= action.value;
      break;
  }
  return newState;
};

export default appState;