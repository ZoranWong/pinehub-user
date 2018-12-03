<template>
    <ul class="order-address">
        <li class="li-item bgff">
            自提点地址
            <p class="details-item">
                {{storeInfo ? storeInfo.address : ''}}
            </p>
        </li>
        <li class="li-item bgff">
            自提点营业
            <p class="details-item">
                {{ sendDate }}
            </p>
        </li>
        <li class="li-item bgff">
            站点联系电话
            <p class="details-item tel-num">
                {{storeInfo ? storeInfo.mobile : ''}}
            </p>
        </li>
    </ul>
</template>
<script>
import {SHOPPING_MALL_ORDER, SITE_USER_ORDER, USER_SELF_PICK_UP, SEND_ORDER_TO_USER} from '@/utils/OrderDict';
export default {
    props: {
        orderType: {
            default: SHOPPING_MALL_ORDER,
            type: Number
        },
        pickUpMethod: {
            default: SEND_ORDER_TO_USER,
            type: Number
        }
    }
}
</script>
