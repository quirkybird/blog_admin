import classNames from 'classnames';
import { Menu } from 'antd';
import router, { useRouter } from '@/router';
import { history } from '@/router';
import type { MenuInfo } from 'rc-menu/lib/interface.d';
import { useMenuStatus } from './hooks';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import useStore from '@/layouts/ConsoleLayout/store';
import { useTranslation } from 'react-i18next';

import './index.less';

/**
 * Layout菜单
 */
const SideMenu = () => {
  const { t: t_layout } = useTranslation('layout');
  const logo = useModel(baseModel, 'logo');
  const { flattenRoutes } = useRouter(router);
  const { menuItems, collapsed } = useStore();

  const {
    openKeys, setOpenKeys,
    selectedKeys, setSelectedKeys,
  } = useMenuStatus();

  function onClickMenuItem(info: MenuInfo) {
    const { key } = info;
    const clickingRoute = flattenRoutes.get(key);
    if (clickingRoute?.external) {
      window.open(clickingRoute.path);
    } else {
      const { key, keyPath } = info;
      setOpenKeys(keyPath.slice(1));
      setSelectedKeys([key]);
      history.push(router.getPathname(key));
    }
  }

  function onOpenChange(_openKeys: string[]) {
    setOpenKeys(_openKeys);
  }

  if (!menuItems.length) return null;

  return (
    <div className={classNames('side-menu', {
      collapsed,
    })}
      style={{
        width: collapsed ? 60 : 230,
      }}
    >
      <div className="side-menu__header">
        <img className="side-menu__header-logo" src={logo} alt="react-antd-console" />
        <h3>{t_layout("岛屿博客管理")}</h3>
      </div>
      <Menu
        className="side-menu__antd-menu"
        mode="inline"
        inlineCollapsed={collapsed}
        items={menuItems}
        selectedKeys={selectedKeys}
        onClick={onClickMenuItem}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default SideMenu;
