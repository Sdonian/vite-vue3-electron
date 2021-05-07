import api from '@/api'
import { restResultType } from "@/models";

/**
 * 获取故障
 */
export function getMalfunctions() {
    api.settings.getMalfunctions().then((restResult: restResultType) => {

    }, error => {

    });
}