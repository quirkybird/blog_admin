import { Card, Input, Row, Col, Button, Space } from "antd";
const TagsManage = () => {
  return (
    <>
      <Card title="便签管理器">
        <Row gutter={16}>
          <Col span={8}>
            <Space>
              <Input />
              <Button type="primary" loading>
                添加
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TagsManage;
