import request from "@/http";

interface POSTLISTRES {
  data?: Record<"recentPost", any[]>;
}

export async function getPersonInfo(userId: number) {
  return request.get<POSTLISTRES>(`/user/${userId}`);
}
