/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import NearbyStores from 'mocks/NearbyStores';
import MyInfo from 'mocks/MyInfo';
import MyFeedback from 'mocks/MyFeedback';
import MyStoreInfo from 'mocks/MyStoreInfo';
import MyStoreScanInfo from 'mocks/MyStoreScanInfo';
import MyStoreStatusPurchase from 'mocks/MyStoreStatusPurchase';
import MyStoreStatusSales from 'mocks/MyStoreStatusSales';
import MyStoreCategories from 'mocks/MyStoreCategories';
import MyStoreCategoryMerchandises from 'mocks/MyStoreCategoryMerchandises';
import MyStoreModifyStock from 'mocks/MyStoreModifyStock';
import MyOrder from 'mocks/MyOrder';
import DistributionOrder from 'mocks/DistributionOrder';
import SelfextraOrder from 'mocks/SelfextraOrder';
import GatherOrder from 'mocks/GatherOrder';

import Merchandises from 'mocks/Merchandises';
import AddMerchandises from 'mocks/AddMerchandises';
import ReduceMerchandises from 'mocks/ReduceMerchandises';
import EmptyMerchandises from 'mocks/EmptyMerchandises';
import Categories from 'mocks/Categories';
import StoreCategories from 'mocks/StoreCategories';
import NearestStore from 'mocks/NearestStore';
import Tickets from "mocks/Tickets";


/* eslint-disable */

export default class MockServiceProvider extends ServiceProvider {
    register () {
        if (this.app.needMock()) {
            this.app.register('mock', require('mockjs'));
            this.app.register('mock.nearbyStores', NearbyStores);
            this.app.register('mock.merchandises', Merchandises);
            this.app.register('mock.addMerchandises', AddMerchandises);
            this.app.register('mock.reduceMerchandises', ReduceMerchandises);
            this.app.register('mock.categories', Categories);
            this.app.register('mock.neareststore', NearestStore);
            this.app.register('mock.emptyMerchandises', EmptyMerchandises);
            this.app.register('mock.storeCategories', StoreCategories);
            this.app.register('mock.tickets', Tickets);

            this.app.register('mock.myInfo', MyInfo);
            this.app.register('mock.myFeedback', MyFeedback);
            this.app.register('mock.myStoreInfo', MyStoreInfo);
            this.app.register('mock.myStoreScanInfo', MyStoreScanInfo);
            this.app.register('mock.myStoreStatusPurchase', MyStoreStatusPurchase);
            this.app.register('mock.myStoreStatusSales', MyStoreStatusSales);
            this.app.register('mock.myStoreCategories', MyStoreCategories);
            this.app.register('mock.myStoreCategoryMerchandises', MyStoreCategoryMerchandises);
            this.app.register('mock.myStoreModifyStock', MyStoreModifyStock);
            this.app.register('mock.myOrders', MyOrder);
            this.app.register('mock.distributeOrder', DistributionOrder);
            this.app.register('mock.selfextraOrder', SelfextraOrder);
            this.app.register('mock.gatherOrder', GatherOrder);
        }
    }

    boot () {

    }
}
