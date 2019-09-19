import Service from '../Service';

export default class PopupService extends Service {
    toast (title, icon = 'success', duration = 1500, mask = true) {
        return new Promise((resolve) => {
            wx.showToast({
                title: title,
                icon: icon,
                duration: duration,
                mask: mask
            });
        });
    }
}
