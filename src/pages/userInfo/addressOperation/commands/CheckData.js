import Command from '../../../../commands/Command';
export default class LoadIntegralProductsCommand extends Command {
    async handle (forms, code, isDefault, tag, id, isPayment, isActivity, actId) {
        if (!forms['consignee_name']) {
            wx.showToast({
                title: '请填写收货人姓名',
                icon: 'none'
            });
            return
        }
        if (!forms['consignee_mobile_phone']) {
            wx.showToast({
                title: '请填写收货人手机号',
                icon: 'none'
            });
            return
        }
        let reg = /^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
        if (!reg.test(forms['consignee_mobile_phone'])) {
            wx.showToast({
                title: '请填写正确格式的收货人手机号',
                icon: 'none'
            });
            return
        }
        if (!code.length) {
            wx.showToast({
                title: '请选择所在地区',
                icon: 'none'
            });
            return
        }
        if (!forms['detail_address']) {
            wx.showToast({
                title: '请填写收货人详细地址',
                icon: 'none'
            });
            return
        }
        if (forms['detail_address'].length < 5) {
            wx.showToast({
                title: '收货人详细地址字数不可小于5',
                icon: 'none'
            });
            return
        }
        // if (tag === false) {
        //     wx.showToast({
        //         title: '请选择地址标签',
        //         icon: 'none'
        //     });
        //     return
        // }
        forms['province_code'] = code[0];
        forms['city_code'] = code[1];
        forms['area_code'] = code[2];
        forms['is_default'] = isDefault;
        forms['tag'] = tag || '';

        if (id) {
            this.$command('EDIT_ADDRESS', forms, id)
        } else {
            this.$command('CREATE_ADDRESS', forms, isPayment, isActivity, actId)
        }
    }
    static commandName () {
        return 'CHECK_DATA';
    }
}
