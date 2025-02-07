import { moduleApi } from "../utils/http";

/**
 * @description 不同服务的接口前缀
 */
export const ServeName = "12";
export const SpotlineApi = "/spotline/access";
export const SpotlineDataProcessApi = "/spotline-data-process/access";
export const SpotlinGatewayeApi = "/spotline/whiteList/access";
export const CommonApi = "/booking-common-resources/access";
export const BookingCommonMessageApi = "/booking-common-message/access";
export const SpotlineCommon = "/spotline/";

/**
 * @description: 现舱接口请求axios实例
 * @return {*}
 */
export const SpotlineAxios = () => moduleApi(SpotlineApi);
export const SpotlineCommonAxios = () => moduleApi(SpotlineCommon);
export const BookingCommonMessageAxios = () =>
  moduleApi(BookingCommonMessageApi);
