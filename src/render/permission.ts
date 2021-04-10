import router from '@/router'
import QProgress from 'qier-progress'


const qprogress = new QProgress({
    height: 4
});

router.beforeEach((to, from, next) => {
    qprogress.start();
    next();
});

router.afterEach(() => {
    qprogress.finish();
});

