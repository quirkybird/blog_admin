import request from "@/http";
// 获取日志
export function getAllLogs() {
  return request.get("/logs/record");
}
