import { SpotlineAxios } from "./config";

/**
 * @description: 用户信息-获取用户信息
 * @return {*}
 */
export const getUserInfo = (): any => {
  return SpotlineAxios().get("/identityInfo/queryIdentityInfo");
};
