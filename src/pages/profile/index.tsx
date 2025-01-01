import { useModel } from "@zhangsai/model";
import { withAuthModel } from "@/models/withAuth";
import { useEffect, useState } from "react";
import { getPersonInfo } from "@/services/user";
import {
  UserOutlined,
  MailOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

import "./index.less";

const Profile = () => {
  const userId = useModel(withAuthModel, "userId");
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    getPersonInfo(userId).then(({ data }: any) => {
      setUser(data[0]);
    });
  }, [userId]);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar-wrapper">
          {user.avatar ? (
            <img src={user.avatar} alt="user avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder">{user.name}</div>
          )}
          <div className="edit-avatar">
            <EditOutlined />
          </div>
        </div>
        <div className="user-info">
          <h1 className="username">
            <UserOutlined /> {user.name}
          </h1>
          <h2 className="real-name">{user.real_name}</h2>
        </div>
      </div>

      <div className="profile-content">
        <div className="info-card">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
