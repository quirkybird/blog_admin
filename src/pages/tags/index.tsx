import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Space,
  message,
  Tag,
  Modal,
  Empty,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { addTag, deleteTag, getAllTags } from "@/services/tags";
import { getRandomColor } from "@/utils";
import "./index.less";
import { ProjectOutlined } from "@ant-design/icons";

interface Tags {
  tag_name: string;
  tag_id: string;
}
const TagsManage = () => {
  const tagRef = useRef("");
  const colorRef = useRef(getRandomColor());
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Array<Tags>>();
  const isEmpty = !tags || tags.length === 0;

  const requestTags = useCallback(() => {
    getAllTags().then(({ data }) => {
      setTags(data.detail);
    });
  }, []);

  useEffect(() => {
    requestTags();
  }, [requestTags]);
  return (
    <Space
      direction="vertical"
      size={15}
      style={{ width: "100%", height: "100%" }}
    >
      <Card title="便签管理器">
        <Row gutter={16}>
          <Col flex="1 0 auto">
            <Space>
              <Input
                onChange={({ target: { value: tag } }) =>
                  (tagRef.current = tag)
                }
              />
              <Button
                type="primary"
                loading={loading}
                onClick={async () => {
                  const tagValue = tagRef.current.trim();
                  if (!tagValue) {
                    message.info("不能为空");
                    return;
                  }
                  try {
                    setLoading(true);
                    const { data } = await addTag(tagValue);
                    if (data.success) message.success(data.msg);
                    else message.error(data.msg);
                    setLoading(false);
                    requestTags();
                  } catch (error) {
                    setLoading(false);
                  }
                }}
              >
                添加
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Card
        style={{
          display: "flex",
          alignItems: isEmpty ? "center" : "flex-start",
          justifyContent: isEmpty ? "center" : "flex-start",
          height: "100%",
        }}
      >
        {tags?.map((tag) => (
          <Tag
            style={{ padding: 4, marginBlock: 6 }}
            key={tag.tag_name}
            color={colorRef.current}
            closeIcon
            onClose={(e) => {
              e.preventDefault();
              Modal.confirm({
                title: `确定要删除标签${tag.tag_name}吗？`,
                onCancel: () => {},
                onOk() {
                  return new Promise<void>((resolve, reject) => {
                    deleteTag(tag.tag_id).then(({ data }) => {
                      if (data.success) {
                        resolve();
                        message.success(data.msg);
                      } else {
                        reject();
                        message.error("删除失败");
                      }
                      requestTags();
                    });
                  });
                },
              });
            }}
          >
            {tag.tag_name}
          </Tag>
        ))}
        {(!tags || tags.length === 0) && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂时没有标签哦"
          />
        )}
      </Card>
    </Space>
  );
};

export default TagsManage;
