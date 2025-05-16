import request from "@/http";

interface POSTLISTRES {
  data?: Record<"recentPost", any[]>;
}

export async function getPersonInfo(userId: number) {
  return request.get<POSTLISTRES>(`/user/${userId}`);
}

export async function editUser(userId: number, payload: any) {
  return request.post(`/user/edit`, payload);
}
