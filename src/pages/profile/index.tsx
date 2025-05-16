import { useModel } from "@zhangsai/model";
import { withAuthModel } from "@/models/withAuth";
import { useEffect, useState } from "react";
import { getPersonInfo, editUser } from "@/services/user";
import {
  UserOutlined,
  MailOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Input, Button, message, Form } from "antd";

import "./index.less";

const Profile = () => {
  const userId = useModel(withAuthModel, "userId");
  const [user, setUser] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getPersonInfo(userId).then(({ data }: any) => {
      setUser(data[0]);
      form.setFieldsValue(data[0]);
    });
  }, [userId]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      values.id = userId;
      await editUser(userId, values);
      getPersonInfo(userId).then(({ data }: any) => {
        setUser(data[0]);
        form.setFieldsValue(data[0]);
      });
      withAuthModel.requestBaseInfo();
      setIsEditing(false);
      message.success("更新资料成功！");
    } catch (error) {
      message.error("啊哦，更新资料失败");
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar-wrapper">
          {user.avatar ? (
            <img src={user.avatar} alt="user avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder">{user.name}</div>
          )}
        </div>
        <div className="user-info">
          {isEditing ? (
            <Form form={form}>
              <Form.Item name="NAME">
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Form>
          ) : (
            <>
              <h1 className="username">
                <UserOutlined /> {user.NAME}
              </h1>
            </>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="info-card">
          {isEditing ? (
            <Form form={form}>
              <div className="info-section">
                <label>
                  <MailOutlined /> Email
                </label>
                <Form.Item name="email">
                  <Input />
                </Form.Item>
              </div>

              <div className="info-section">
                <label>
                  <InfoCircleOutlined /> About
                </label>
                <Form.Item name="about">
                  <Input.TextArea />
                </Form.Item>
              </div>
            </Form>
          ) : (
            <>
              <div className="info-section">
                <label>
                  <MailOutlined /> Email
                </label>
                <p>{user.email}</p>
              </div>

              <div className="info-section">
                <label>
                  <InfoCircleOutlined /> About
                </label>
                <p className="about-text">{user.about}</p>
              </div>

              <div className="info-section">
                <label>Account Status</label>
                <p className={`status ${user.enable ? "active" : "inactive"}`}>
                  {user.enable ? (
                    <>
                      <CheckCircleOutlined /> Active
                    </>
                  ) : (
                    <>
                      <StopOutlined /> Inactive
                    </>
                  )}
                </p>
              </div>

              <div className="info-section dates">
                <div>
                  <label>
                    <ClockCircleOutlined /> Member Since
                  </label>
                  <p>{new Date(user.create_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <label>
                    <ClockCircleOutlined /> Last Updated
                  </label>
                  <p>{new Date(user.update_at).toLocaleDateString()}</p>
                </div>
              </div>
            </>
          )}

          <div className="actions">
            {isEditing ? (
              <>
                <Button type="primary" onClick={handleSave}>
                  保存
                </Button>
                <Button onClick={() => setIsEditing(false)}>取消</Button>
              </>
            ) : (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
              >
                编辑信息
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
