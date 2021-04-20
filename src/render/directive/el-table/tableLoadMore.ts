import { debounce } from "throttle-debounce"
export default {
    beforeMount(el: Element, binding, vnode) {
        const bodyWrapper = el.querySelector('.el-table__body-wrapper');
        //let valueFun = debounce(100, false, binding.value);
        bodyWrapper.addEventListener("scroll", (evt: Event) => {
            let sign = 1;
            let el = evt.target as Element;
            const scrollDistance = el.scrollHeight - el.scrollTop - el.clientHeight
            if (scrollDistance <= sign) {
                //valueFun();
                binding.value();
            }
        });
    }
}