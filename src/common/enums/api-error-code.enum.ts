export enum ApiErrorCode {
  SUCCESS = 0, // 成功
  USER_ID_INVALID = 10001, // 用户id无效
  USER_NOT_EXIST = 10002, // 用户id不存在
  COMMON_CODE = 20000, //通用错误码,想偷懒就返回这个
}
