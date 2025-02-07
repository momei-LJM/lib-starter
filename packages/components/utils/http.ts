import { ElMessage } from "@hgj/element-plus";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import qs from "qs";
import { reactive } from "vue";
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = "success",
}
/**
 * @description 全局异常 code
 */
export enum EAPP_EXCEPTION_CODE {
  /** 暂未开通订舱 */
  BOOKINT_NOT_AUTH = 510111038,
  /** 该港口、船司暂未支持订舱 */
  BOOKINT_NOT_SUPPORTED = 510111029,
  /** 存在待支付订单 */
  ROB_SPOT_WAIT_PAY = 510111018,
  /** 保证金不足 */
  ROB_SPOT_MARGIN_NOT_ENOUGH = 510113006,
  /** 您的发票抬头还没有维护噢，请先维护 */
  INVOICE_HEADER_MISSING = 510114014,
  /** 与认证的企业名称不一致，请修改抬头 */
  ENTERRPRISES_INCONSISTENT = 510114015,
  /** 公司地址未维护，请补充完整 */
  ENTERRPRISES_UNMAINTAINDER = 510114016,
  /** 公司电话未维护，请补充完整 */
  ENTERRPRISES_PHONE_NOT_MAINTAINED = 510114017,
  /** 开户行及账号未维护，请补充完整 */
  ENTERRPRISES_INCOMPLETE = 510114018,
}
const httpHeadersGetter = (): {
  "access-token": string;
  [x: string]: any;
} => {
  return {
    "access-token": "",
  };
};
interface THttpStore {
  baseUrl: string;
  httpHeadersGetter: typeof httpHeadersGetter;
}
const store = reactive<THttpStore>({
  baseUrl: "",
  httpHeadersGetter,
});
export const setupHttp = (config: THttpStore) => {
  console.log(333333, config);
  Object.assign(store, config);
};

/**
 * @description 全局跳过提示的 code
 */
export const APP_SKIP_MSG_CODES = [510110042];
const AppGlobalCodeList = Object.values(EAPP_EXCEPTION_CODE);
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

const query = qs.parse(window.location?.search, { ignoreQueryPrefix: true });

export class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create({ ...config });
    console.log(44444, store);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: any) => {
        const headers = store.httpHeadersGetter();
        if (headers) {
          Object.keys(headers).forEach((key) => {
            config.headers[key] = headers[key];
          });
        }
        // 获取地址栏的from参数作为请求的来源标记
        query?.from && (config.headers["x-source"] = query.from);
        return { ...config };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, headers } = response;
        if (data.code == ResultEnum.OVERDUE) {
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          // 跳过Elmessage
          if (APP_SKIP_MSG_CODES.includes(data.code)) {
            return Promise.reject(data);
          }
          // AppGlobalCodeList 这里的code通常需要使用的地方单独弹窗的 不能和ElMessage叠加出现
          !AppGlobalCodeList.includes(data.code) &&
            ElMessage({
              message: data.message,
              grouping: true,
              type: "error",
            });
          return Promise.reject(data);
        }
        // * 成功请求
        return headers["content-disposition"]?.includes("attachment")
          ? data
          : data.data;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, {
      params,
      ..._object,
      paramsSerializer: function (params) {
        // get方法参数传递方式从urlsearchparams改为uriencode编码
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, data?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { data, ..._object });
  }
}
export const moduleApi = (moduleBaseUrl: string) => {
  let moduleConfig: any = { ...config, baseURL: store.baseUrl };
  moduleConfig.baseURL += moduleBaseUrl;
  return new RequestHttp(moduleConfig);
};
