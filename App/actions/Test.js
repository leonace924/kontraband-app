export const getNews = () => ({
  type: 'GET_NEWS',
});

export const getGithubData = (name) => ({
  type: 'GET_DATA',
  name: name
});