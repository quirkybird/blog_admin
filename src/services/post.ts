import request from "@/http";

interface POSTLISTREQ {
  name?: string;
}

interface POSTLISTRES {
  data?: Record<"recentPost", []>;
}

// 文章列表
export async function fetchPostList(data?: POSTLISTREQ) {
  return request.get<POSTLISTRES>("/post/all");
}

// 删除文章
export function deletePostItem(id: string) {
  return request.get("/post/delete/" + id);
}

// 编辑文章
export function editPostItem(id: string) {
  return request.get("/post/edit/" + id);
}
