import { Response } from "@/common";

export function createResponse<T>(
  status: boolean,
  message: string,
  data: T
): Response<T> {
  return {
    status,
    message,
    data,
  };
}
