import TablePage from "@/components/TablePage";
import { Table, Tag, Button, message, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { baseModel } from "@/models/base";
import { useModel } from "@zhangsai/model";
import { useEffect, useState, useCallback } from "react";
import { fetchPostList, deletePostItem } from "@/services/post";
import { BLOG_TYPE } from "@/consts";
import { getEnumLabel } from "@/utils";
import dayjs from "dayjs";

interface SearchModel {
  a: string;
  b: string;
}

interface ListItem {
  a: string;
  b: string;
}

/**
 * 简单使用TablePage
 */
const SimpleTablePage = () => {
  const { t: t_tablePage } = useTranslation("tablePage");
  const language = useModel(baseModel, "language");
  const [data, setData] = useState<any>([]);

  const requestTableData = useCallback(() => {
    fetchPostList().then(({ data }) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    requestTableData();
  }, [requestTableData]);

  const columns: ColumnsType<ListItem> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      minWidth: 100,
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },

    {
      title: "类型",
      dataIndex: "categories",
      key: "categories",
      render: (val) =>
        val ===
        getEnumLabel<typeof BLOG_TYPE>(BLOG_TYPE, BLOG_TYPE.life_blog) ? (
          <Tag color="purple">{BLOG_TYPE.life_blog}</Tag>
        ) : (
          <Tag color="orange">{BLOG_TYPE.tech_blog}</Tag>
        ),
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (val) =>
        JSON.parse(val).map((tag: string, index: number) => (
          <Tag color="blue" key={`tag-${index}`}>
            {tag}
          </Tag>
        )),
    },
    {
      title: "创建时间",
      dataIndex: "create_at",
      key: "create_at",
      render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "修改时间",
      dataIndex: "update_at",
      key: "update_at",
      render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      dataIndex: "a",
      render: (_, row: any) => (
        <>
          <Button
            color="danger"
            variant="outlined"
            onClick={() => {
              Modal.confirm({
                destroyOnClose: true,
                style: { top: "30%" },
                title: "确定要删除这篇文章吗？",
                onOk: () => {
                  deletePostItem(row?.id)
                    .then(() => {
                      message.success("删除成功");
                      requestTableData();
                      return Promise.resolve();
                    })
                    .catch((error) => {
                      message.error("删除失败，原因" + error);

                      return Promise.reject();
                    });
                },
              });
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    // <TablePage<SearchModel, ListItem>
    //   language={language}
    //   url={`/table/common`}
    //   listRender={({ data }) => {
    //     return (
    <Table
      bordered
      dataSource={data}
      columns={columns}
      pagination={{ position: ["bottomRight"] }}
      // key="a"
      rowKey="id"
    />
  );
  //       }}
  //     />
  //   );
};

export default SimpleTablePage;
