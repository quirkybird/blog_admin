import { Model, INITIAL_STATE } from '@zhangsai/model';
import { httpGetBaseInfo } from '@/services/withAuth';
import notPermissions  from './permissions';
import { lsGetToken, lsRemoveToken } from '@/utils/business/token';
import router, { history } from '@/router';
import { httpPostLogout } from '@/services/login';
import i18n from '@/locales';
import { message } from '@/components/AntdProvider';
import { tabsModel } from '../tabs';

class InitialState extends INITIAL_STATE {
  /** 请求基本信息中 */
  loading: boolean = true; // 如果是true,则热更新会重新取true,导致组件 重新渲染
  /** 有token */
  hasToken: boolean = false;
  /** 是否已请求过基本信息 */
  hasRequestedBaseInfo: boolean = false;
  /** mine */
  userId: number = 0;
  userAccount: string = '';
  avatar: string = '';
  /** 当前用户拥有的权限 */
  permissions: Record<string, boolean> = {};
}
const initialState = new InitialState();

class WithAuth extends Model<InitialState> {
  constructor() {
    super(initialState);
  }
  async init() {
    // 无token，去登录
    const { accessToken } = lsGetToken({ bellwether: true }) ?? {};
    if (!accessToken) {
      this.setState({
        hasToken: false,
        loading: false,
      });
      history.push(`/login?reUrl=${window.location.href}`);
      return;
    }

    this.setState({ hasToken: true });

    // 请求基础数据
    try {
      if (!this.state.hasRequestedBaseInfo) {
        await this.requestBaseInfo();
        tabsModel.init();
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
    this.checkPermissionOfLocation();
  }
  /**
   * 检查自己是否具备当前路由的访问权限，没有则去no-access页
   */
  checkPermissionOfLocation() {
    const routePath = router.getRoutePath(window.location.pathname);
    const route = router.flattenRoutes.get(routePath);
    if (route?.permission && !this.state.permissions[route.permission]) {
      history.push('/no-access');
    }
  }
  /**
   * 执行时机建议在跳往 登录 403 404 等页面时触发
   */
  destroy() {
    this.setState(initialState);
  }
  async requestBaseInfo() {
    // 写死
    // return httpGetBaseInfo().then(res => {
      // const { userId = 0, userAccount = '', avatar = '', permissions = [] } = res.data.data;
      this.setState({
        hasRequestedBaseInfo: true,
        userId: 2,
        userAccount: '此夜曲中闻折柳',
        avatar: 'https://p26-passport.byteacctimg.com/img/user-avatar/27f273980e0597820475cc6fd66cf037~120x120.awebp',
        permissions: notPermissions(),
      });
    // });
  }
  async actionLogout() {
    // return httpPostLogout().then(() => {
      this.destroy();
      message.success(i18n.t('layout:已登出'));
      history.push('/login');
      lsRemoveToken();
    // });
  }
}

/** 配合withAuth组件的model */
export const withAuthModel = new WithAuth();

