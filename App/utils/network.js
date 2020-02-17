import { constants } from "../constants";

const extractResult = async res => {
  let resp = await res
  return Promise.resolve(resp);
};

const extractError = err => {
  return Promise.reject(err);
};

const getFormHeader = formData => {
  return formData
    ? {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    :
    {
      headers: {
        "Accept": "application/json",
        "content-type": "application/json",
      }
    };
};

const getAuthHeadersObj = (token, formData1) => {
  return token
    ? {
      headers: {
        Authorization: token,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    : getFormHeader(formData1)
};

export const apiFetch = (url, token, nsfw = 0) => {
  const requestUrl = `${constants.baseUrl.baseUrl}${url}&token=${constants.token}&nsfw=0`;
  return fetch(requestUrl, getAuthHeadersObj(token))
    .then(extractResult)
    .catch(extractError);
};

export const apiInstagramFetch = (url) => {
  return fetch(url)
    .then(extractResult)
    .catch(extractError);
};



export const apiFetchPost = (url, body, token) => {
  let requestData = {
    method: "POST",
    body: JSON.stringify(body)
  };
  
  requestData.headers = getAuthHeadersObj(token).headers;
  const requestUrl = `${constants.baseUrl.baseUrl}${url}`;
  return fetch(requestUrl, requestData)
    .then(extractResult)
    .catch(extractError);
};

export const apiFetchPostWithFormData = (url, body, token) => {
  let requestData = {
    method: "POST",
    body: body
  };

  requestData.headers = {
    Authorization: token,
    'Content-Type': 'multipart/form-data; charset=utf-8; boundary=__X_PAW_BOUNDARY__',
  };
  const requestUrl = `${constants.baseUrl.baseUrl}${url}`;
  return fetch(requestUrl, requestData)
    .then(extractResult)
    .catch(extractError);
};

export const apiFetchPatch = (url, body, token, formData) => {
  let requestData = {
    method: "PATCH",
    body: JSON.stringify(body)
  };
  requestData.headers = getAuthHeadersObj(token, formData).headers;
  const requestUrl = `${constants.baseUrl.baseUrl}${url}?token=${constants.token}`;
  return fetch(requestUrl, requestData)
    .then(extractResult)
    .catch(extractError);
};

export const apiFetchDelete = async (url, token) => {
  let requestData = {
    method: "DELETE"
  };
  requestData.headers = getAuthHeadersObj(token).headers;
  const requestUrl = `${constants.baseUrl.baseUrl}${url}`;
  return await fetch(requestUrl, requestData)
    .then(extractResult)
    .catch(extractError => alert("error", extractError));
};

export const apiFetchPut = (url, body, token) => {
  let requestData = {
    method: "PUT",
    body: JSON.stringify(body)
  };
  requestData.headers = getAuthHeadersObj(token).headers;
  const requestUrl = `${constants.baseUrl.baseUrl}${url}?token=${constants.token}`;
  return fetch(requestUrl, requestData)
    .then(extractResult)
    .catch(extractError);
};