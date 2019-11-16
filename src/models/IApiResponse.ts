export enum ApiResponseTypes {
  Success = "success",
  Error = "error"
}
export interface IApiResponse<T> {
  data?: T
  resultType: ApiResponseTypes,
  errorMessage?: string;
}