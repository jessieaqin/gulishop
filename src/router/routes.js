
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const PaySuccess = () => import('@/pages/PaySuccess')
const Pay = () => import('@/pages/Pay')
const Trade = () => import('@/pages/Trade')
const Center = () => import('@/pages/Center')
const GroupOrder = () => import('@/pages/Center/GroupOrder')
const MyOrder = () => import('@/pages/Center/MyOrder')


// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import PaySuccess from '@/pages/PaySuccess'
// import Pay from '@/pages/Pay'
// import Trade from '@/pages/Trade'
// import Center from '@/pages/Center'
// import GroupOrder from '@/pages/Center/GroupOrder'
// import MyOrder from '@/pages/Center/MyOrder'


export default
    [{
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login,
        //判断底部是否隐藏
        //meta路由元信息
        meta: {
            ishidden: true
        }
    }, {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            ishidden: true
        }

    }, {
        name: 'search',
        path: '/search/:keyword?',
        component: Search
    }, {
        path: '/',
        redirect: '/home'
    }, {
        path: '/detail/:goodsId',
        component: Detail
    }, {
        path: '/addcarsuccess',
        component: AddCartSuccess,
        beforeEnter: (to, from, next) => {
            //只有携带了skuNum和sessionStrong内部有skuInfo数据，才能看到添加购物车成功的界面
            let skuNum = to.query.skuNum
            let skuInfo = sessionStorage.getItem("SKUINFO_KEY")
            if (skuNum && skuInfo) {
                next()
            } else {
                alert('必须携带商品数量和商品信息数据')
                next(false)//什么都不做
            }
        },

    }, {
        path: '/shopcart',
        component: ShopCart,
    }, {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            //只有从支付页面才能跳转支付成功页面
            if (from.path === '/trade') {
                next()
            } else {
                alert('必须通过支付进入')
                next(false)//什么都不做
            }
        },

    }, {
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            //只有交易页面（创建订单）才能跳转支付页面
            if (from.path === '/trade') {
                next()
            } else {
                alert('必须通过交易页面进入')
                next(false)//什么都不做
            }
        },
    }, {
        path: '/trade',
        component: Trade,
        //只有购物车页面才能跳转交易页面（创建订单）
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                alert('必须通过购物车进入')
                next(false)//什么都不做
            }
        },
    }, {
        path: '/center',
        component: Center,
        children: [
            {
                path: '/center/grouporder',
                component: GroupOrder
            }, {
                path: '/center/myorder',
                component: MyOrder
            },
            {
                path: '',
                redirect: '/center/myorder'
            }

        ]
    },
    ]//配置路由
