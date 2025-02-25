import request from "@/http";

// 增加tag接口
export const addTag = (tag: string) => {
  return request.post<any>("/tag/add", { tagName: tag });
};

// 查询全部tag
export const getAllTags = () => {
  return request.get<any>("/tag/getAllTags");
};

//删除tag
export const deleteTag = (id: string) => {
  return request.delete<any>("/tag/delete", { params: { tagId: id } });
};
