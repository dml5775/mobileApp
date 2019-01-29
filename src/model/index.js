import { testUrl, shopsUrl, filterUrl, otherFilterUrl, shopDetailsUrl, qutoPayUrl, orderDetailsUrl, calcDisUrl } from "@shared/api";
import { getFetch, postFetch } from "@util/index"; //postFetch

export const getFetchTest = async() => {
  const res = await new Promise(res => {
    setTimeout(() => {
      res(testUrl);
    }, 2000);
  });
  return res;
};

export const shopLists = (param = {}) => getFetch(shopsUrl, param);
export const filterDatas = () => getFetch(filterUrl);
export const otherFilterDatas = (param = {}) => getFetch(otherFilterUrl, param);
export const shopDetails = (param = {}) => getFetch(shopDetailsUrl, param);
export const qutoPay = (param = {}) => getFetch(qutoPayUrl, param);
export const orderDetails = (param = {}) => getFetch(orderDetailsUrl, param);
export const calcDis = (param = {}) => postFetch(calcDisUrl, param);