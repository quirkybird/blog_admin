import React, { FC, ReactNode, useEffect, useState } from "react";
import { Divider, Steps } from "antd";
import { getAllLogs } from "@/services/logs";
import { LOGS_TYPE } from "@/consts";
import dayjs from "dayjs";
import { useModel } from "@zhangsai/model";
import { themeModel } from "@/models/theme";

const format = (a: string) => {
  return dayjs(a).format("YYYY-MM-DD HH:mm:ss");
};

const changeName = (englishV: string) => {
  let chinaV = "";
  switch (englishV) {
    case "title":
      chinaV = "标题";
      break;
    case "author":
      chinaV = "作者";
      break;
    case "categories":
      chinaV = "分类";
      break;
    case "content":
      chinaV = "文章文件";
      break;
    case "tags":
      chinaV = "标签";
      break;
    case "descr":
      chinaV = "文章描述";
      break;

    case "image":
      chinaV = "封面文件";
      break;
    default:
      break;
  }

  return chinaV;
};
const Logs: React.FC = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAllLogs().then(({ data }: any) => {
      const formatData = data.map((item: any) => {
        const mapItem: { title: string; description: ReactNode } = {
          title: "",
          description: "",
        };
        if (item.log_level === "login") {
          mapItem.title = item.user_name + LOGS_TYPE.login;
          mapItem.description = format(item.log_timestamp);
        } else if (item.log_level === "logout") {
          mapItem.title = item.user_name + LOGS_TYPE.logout;
          mapItem.description = format(item.log_timestamp);
        } else if (item.log_level === "delete") {
          mapItem.title = item.user_name + LOGS_TYPE.delete + item.log_message;
          mapItem.description = format(item.log_timestamp);
        } else if (item.log_level === "add") {
          mapItem.title = item.user_name + LOGS_TYPE.add + item.log_message;
          mapItem.description = format(item.log_timestamp);
        } else if (item.log_level === "edit") {
          const jsMessage = JSON.parse(item.log_message);
          mapItem.title =
            item.user_name + LOGS_TYPE.edit + "了文章" + jsMessage.title;
          const logs = jsMessage.keyOfChange.map(
            (key: string, index: number) => ({
              name: changeName(key),
              beforeValue: jsMessage.originData[index],
              afterValue: jsMessage.changeData[index],
            })
          );

          const logsString =
            logs
              .map((log: any) => {
                return `${log.name}从${log.beforeValue}修改为了${log.afterValue} <br />`;
              })
              .join("") + format(item.log_timestamp);
          const rlogsString1 = logsString.replace("life_blog", "生活博客");
          const rlogsString2 = rlogsString1.replace("tech_blog", "技术博客");

          mapItem.description = (<LogCard logs={rlogsString2} />) as ReactNode;
        }
        return mapItem;
      });
      setLogs(formatData);
    });
  }, []);
  return (
    <>
      <h2>日志管理</h2>
      <Divider />
      <Steps
        progressDot
        current={logs.length}
        direction="vertical"
        items={logs}
      />
    </>
  );
};

export default Logs;

function LogCard({ logs }: { logs: string }) {
  const colorPrimary = useModel(themeModel, "colorPrimary");

  return (
    <div
      style={{
        padding: 12,
        background: `linear-gradient(150deg, ${colorPrimary}, #fff)`,
        borderRadius: 5,
        color: "white",
        lineHeight: 2,
      }}
      dangerouslySetInnerHTML={{ __html: logs }}
    ></div>
  );
}
