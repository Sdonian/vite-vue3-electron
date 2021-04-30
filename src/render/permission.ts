import router from '@/router'
import QProgress from 'qier-progress'


const qprogress = new QProgress({
    height: 4
});

router.beforeEach((to, from, next) => {
    //路由采用webhistory模式,hash改变则不进行progress显示
    if (to.path != from.path) {
        qprogress.start();
    }
    next();
});

router.afterEach(() => {
    qprogress.finish();
});

