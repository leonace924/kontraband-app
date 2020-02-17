export const signUpUser = (body) => ({
  type: 'SIGNUP_USER',
  body: body
});

export const loginUserData = (body) => ({
  type: 'LOGIN_USER',
  body: body
});

export const onSocialLoginData = (body) => ({
  type: 'LOGIN_SOCIAL',
  body: body
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});

