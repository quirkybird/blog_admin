import { message } from "@/components/AntdProvider";
import { history } from "@/router";
import { httpPostLogin } from "@/services/login";
import { lsSetToken } from "@/utils/business/token";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import SvgIcon from "@/components/SvgIcon";

interface FormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [form] = Form.useForm<FormValues>();
  const { t: t_login } = useTranslation("login");

  const onFinish = () => {
    form
      .validateFields()
      .then(({ username, password }: FormValues) => {
        httpPostLogin({
          username,
          password,
        })
          .then(({ data }) => {
            lsSetToken(data.token);
            message.success(t_login("登录成功"));
            const reUrl = window.location.search
              .replace(/^\?/, "")
              .split("&")
              .map((item) => item.split("="))
              .find(([key]) => key === "reUrl")?.[1];
            history.push(reUrl ?? "/");
          })
          .catch((error) => {
            console.log(error);
            error.response && message.error(error.response.data);
          });
      })
      .catch(() => {});
  };

  return (
    <div className="console-login__login-form">
      <div className="console-login__login-form-header">
        <img src="/images/logo.png" alt="react-antd-console" width={56} />
        <h1>岛屿博客管理</h1>
      </div>
      <Form
        form={form}
        initialValues={{
          username: "此夜曲中闻折柳",
          password: "555222000",
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          className="console-login__login-form-item"
          name="username"
          rules={[{ required: true, message: t_login("请输入帐号") }]}
        >
          <Input
            size="large"
            prefix={<SvgIcon name="user" />}
            placeholder="admin"
          />
        </Form.Item>
        <Form.Item
          className="console-login__login-form-item"
          name="password"
          rules={[{ required: true, message: t_login("请输入密码") }]}
        >
          <Input
            size="large"
            prefix={<SvgIcon name="locked" />}
            type="password"
            placeholder="admin"
          />
        </Form.Item>
        <Form.Item className="console-login__login-form-item">
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t_login("记住我")}</Checkbox>
            </Form.Item>
            <a>{t_login("忘记密码")}</a>
          </Flex>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button block type="primary" htmlType="submit" size="large">
            {t_login("登录")}
          </Button>
          {/* <div className="console-login__login-form-register">
            {t_login('或')} <a>{t_login('注册')}</a>
          </div> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
