import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus';

export default (text: string, event: Event) => {
    const clipboard = new Clipboard(event.target as Element, {
        text: () => text
    })
    clipboard.on('success', () => {
        ElMessage.success("复制成功！");
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        ElMessage.success("复制失败！");
        clipboard.destroy();
    });
}
