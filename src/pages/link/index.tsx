import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal, Space, Table, Image } from "antd";
import { useEffect, useState } from "react";
import {
  FriendLinkType,
  createFriendLink,
  deleteFriendLink,
  getFriendLinks,
  updateFriendLink,
} from "@/services/friendLink";
import "./index.less";

interface FriendLink {
  id: number;
  nickname: string;
  website_title: string;
  website_link: string;
  website_cover: string;
  theme_color: string;
  website_desr?: string;
  email?: string;
  update_at: string;
}

const LinkPage = () => {
  const { message } = App.useApp();
  const [links, setLinks] = useState<FriendLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<FriendLink | null>(null);
  const [form] = Form.useForm();

  // 获取友链数据
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const {
        data: { data, code, message: msg },
      } = await getFriendLinks();
      console.log("友链数据:", data); // 调试用
      if (code === 200) {
        setLinks(data);
        console.log("友链数据:", data); // 调试用
      } else {
        message.error(msg || "获取友链列表失败");
        setLinks([]);
      }
    } catch (error) {
      console.error("获取友链失败:", error);
      message.error("获取友链列表失败");
      setLinks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAdd = () => {
    setEditingLink(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: FriendLink) => {
    setEditingLink(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFriendLink(id);
      message.success("删除成功");
      fetchLinks(); // 重新加载列表
    } catch (error) {
      message.error("删除失败");
    }
  };

  const handleSubmit = async (values: FriendLinkType) => {
    try {
      if (editingLink) {
        const {
          data: { code, message: msg },
        } = await updateFriendLink(editingLink.id!, values);
        if (code === 200) {
          message.success("更新成功");
          setIsModalOpen(false);
          fetchLinks();
        } else {
          message.error(msg || "更新失败");
        }
      } else {
        const {
          data: { code, message: msg },
        } = await createFriendLink(values);
        if (code === 200) {
          message.success("添加成功");
          setIsModalOpen(false);
          fetchLinks();
        } else {
          message.error(msg || "添加失败");
        }
      }
    } catch (error) {
      console.error("操作失败:", error);
      message.error(editingLink ? "更新失败" : "添加失败");
    }
  };

  const columns = [
    {
      title: "网站封面",
      dataIndex: "website_cover",
      key: "website_cover",
      width: 90,
      align: "center" as const,
      render: (cover: string) => (
        <div style={{ padding: "8px 0" }}>
          <Image
            src={cover}
            alt="封面"
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
        </div>
      ),
    },
    {
      title: "网站标题",
      dataIndex: "website_title",
      key: "website_title",
      ellipsis: true,
      width: 120,
    },
    {
      title: "网站链接",
      dataIndex: "website_link",
      key: "website_link",
      ellipsis: true,
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "博主昵称",
      dataIndex: "nickname",
      key: "nickname",
      width: 120,
      align: "center" as const,
    },
    {
      title: "主题色",
      dataIndex: "theme_color",
      key: "theme_color",
      width: 80,
      align: "center" as const,
      render: (color: string) => (
        <div style={{ padding: "8px 0" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: color,
              borderRadius: "4px",
              margin: "0 auto",
            }}
          />
        </div>
      ),
    },
    {
      title: "网站描述",
      dataIndex: "website_desr",
      key: "website_desr",
      ellipsis: true,
      width: 200,
    },
    {
      title: "更新时间",
      dataIndex: "update_at",
      key: "update_at",
      width: 160,
      align: "center" as const,
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "操作",
      key: "action",
      fixed: "right" as const,
      align: "center" as const,
      render: (_: any, record: FriendLink) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="link-page">
      <div className="action-bar">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增友链
        </Button>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={links}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          bordered
          size="middle"
        />
      </div>

      <Modal
        title={editingLink ? "编辑友链" : "新增友链"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="nickname"
            label="博主昵称"
            rules={[{ required: true, message: "请输入博主昵称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website_title"
            label="网站标题"
            rules={[{ required: true, message: "请输入网站标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website_link"
            label="网站链接"
            rules={[{ required: true, message: "请输入网站链接" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website_cover"
            label="网站封面"
            rules={[{ required: true, message: "请输入网站封面链接" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="theme_color"
            label="主题色"
            rules={[{ required: true, message: "请输入主题色" }]}
          >
            <Input type="color" style={{ width: "60px", height: "32px" }} />
          </Form.Item>
          <Form.Item name="website_desr" label="网站描述">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="email" label="联系邮箱">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LinkPage;
