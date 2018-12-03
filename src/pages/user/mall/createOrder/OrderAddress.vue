<template>
    <ul class="order-address">
        <li class="li-item bgff">
            配送地址
            <p class="details-item">
                <input type="text" class="big-input" v-model="address">
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
