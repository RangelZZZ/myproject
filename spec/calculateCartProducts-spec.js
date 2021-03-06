var pos = require("../main/calculateCartProducts.js");
var theNeedData = require("./fixture.js");

describe('calculateCartProducts', function () {
    var promotions = theNeedData.loadPromotinProducts();

    it("when there are no product to discount", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            count: 3
        }];
        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000004',
                    name: '电池',
                    unit: '个',
                    price: 2.00
                },
                count: 3
            },
            subTotal: 6.00,
            savedTotal: 0.00
        }];

        var receiptProducts = pos.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });

    it("when there are only buy two get one for free discount", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            },
            count: 3
        }];
        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 3
            },
            subTotal: 9.00,
            savedTotal: 4.50
        }];
        var receiptProducts = pos.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });

    it("when there are only five percent discount", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            count: 2
        }];
        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000002',
                    name: '苹果',
                    unit: '斤',
                    price: 5.50
                },
                count: 2
            },
            subTotal: 10.45,
            savedTotal: 0.55
        }];
        var receiptProducts = pos.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });

    it("when one product has two discounts", function () {
        var cartProduct = [{
            product: {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            count: 3
        }];

        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 3
            },
            subTotal: 6,
            savedTotal: 3
        }];

        var receiptProducts = pos.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });
    it("when there are all kinds of products", function () {
        var cartProduct = [
            {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 3
            },
            {
                product: {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                count: 3
            }
        ];

        var expectReceiptProducts = [{
            receiptProduct: {
                product: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    price: 3.00
                },
                count: 3
            },
            subTotal: 6.00,
            savedTotal: 3.00
        },
            {
                receiptProduct: {
                    product: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15.00
                    },
                    count: 3
                },
                subTotal: 42.75,
                savedTotal: 2.25
            }
        ];
        var receiptProducts = pos.calculateCartProducts(promotions, cartProduct);

        expect(receiptProducts).toEqual(expectReceiptProducts);
    });
});