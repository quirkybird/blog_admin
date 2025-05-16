import request from "@/http";

export interface FriendLinkType {
  id?: number;
  nickname: string;
  email?: string;
  theme_color: string;
  website_title: string;
  website_link: string;
  website_cover: string;
  website_desr: string;
  create_at?: string;
  update_at?: string;
}

// 创建友链
export const createFriendLink = (data: FriendLinkType) => {
  return request({
    url: "/friend-links",
    method: "post",
    data,
  });
};

// 获取所有友链
export const getFriendLinks = () => {
  return request({
    url: "/friend-links",
    method: "get",
  });
};

// 获取单个友链详情
export const getFriendLink = (id: number) => {
  return request({
    url: `/friend-links/${id}`,
    method: "get",
  });
};

// 更新友链
export const updateFriendLink = (id: number, data: FriendLinkType) => {
  return request({
    url: `/friend-links/${id}`,
    method: "put",
    data,
  });
};

// 删除友链
export const deleteFriendLink = (id: number) => {
  return request({
    url: `/friend-links/${id}`,
    method: "delete",
  });
};
