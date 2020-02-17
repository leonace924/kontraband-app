import { Dimensions } from 'react-native';
import { TRACKING_ID } from '../config/Analytic';
import { Analytics, Event } from 'expo-analytics';

export const calculateDynamicHeight = (originHeight, originWidth) => {
  const { width } = Dimensions.get("screen");
  const dynamicHeight = (width * originHeight) / originWidth;
  return dynamicHeight;
}

export const getFileName = path => {
  return path.replace(/^.*[\\\/]/, '')
}

export const currentDate = () => {
  const now = new Date();
  const tzo = -now.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  const pad = function (num) {
    let norm = Math.abs(Math.floor(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  return now.getFullYear()
    + '-' + pad(now.getMonth() + 1)
    + '-' + pad(now.getDate())
    + ' ' + pad(now.getHours())
    + ':' + pad(now.getMinutes())
    + ':' + pad(now.getSeconds())
    + dif + pad(tzo / 60)
    + ':' + pad(tzo % 60);
}

export const tracking = (screenName) => {
  const analytics = new Analytics(TRACKING_ID);
  analytics.event(new Event('Screen', screenName))
    .then(() => {})
    .catch(e => console.log(e.message));
}

