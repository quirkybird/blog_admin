/**
 * 把后端定义的权限映射为前端定义的权限
 * @param permissions 后端定义的权限名称
 */
function formatPermissions(permissions: string[]) {
  const set = new Set(permissions);
  return {
    home: set.has('home'),
    homeIndex: set.has('home:index'),
    homeGrid: set.has('home:grid'),
    profile: set.has('profile'),

    permission: set.has('permission'),
    routePermission: set.has('permission:route'),
    localPermission: set.has('permission:local'),
    permissionLocalBtn1: set.has('permission:local:btn1'),
    permissionLocalBtn2: set.has('permission:local:btn2'),

    router: set.has('router'),
    routerDynamic: set.has('router:dynamic'),
    routerMeta: set.has('router:meta'),

    tablePage: set.has('tablePage'),
    complexTablePage: set.has('tablePage:tablePage'),
    complexTablePageDetail: set.has('tablePage:tablePageDetail'),
    scrollLoadModeList: set.has('tablePage:scrollLoadModeList'),
    scrollLoadModeTable: set.has('tablePage:scrollLoadModeTable'),
    extraSearchModel: set.has('tablePage:extraSearchModel'),
    formatSearchModel: set.has('tablePage:formatSearchModel'),
    simpleTablePage: set.has('tablePage:simpleTablePage'),
    tablePageInModal: set.has('tablePage:tablePageInModal'),
    customSearchBtn: set.has('tablePage:customSearchBtn'),

    nest: set.has('nest'),
    error: set.has('error'),

    external: set.has('external'),
    singleSlider: set.has('singleSlider'),
    separation: set.has('separation'),
  };
}

//项目不做权限控制使用notPermissions

function notPermissions() {
  return {
    home: true,
    homeIndex: true,
    homeGrid: true,
    profile: true,

    permission: true,
    routePermission: true,
    localPermission: true,
    permissionLocalBtn1: true,
    permissionLocalBtn2: true,

    router: true,
    routerDynamic: true,
    routerMeta: true,

    tablePage: true,
    complexTablePage: true,
    complexTablePageDetail: true,
    scrollLoadModeList: true,
    scrollLoadModeTable:true,
    extraSearchModel: true,
    formatSearchModel: true,
    simpleTablePage: true,
    tablePageInModal: true,
    customSearchBtn: true,

    nest: true,
    error:true,

    external: true,
    singleSlider: true,
    separation: true,
  };
}



export default notPermissions;

