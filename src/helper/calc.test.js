import calc from './calc';

describe('calc.js', () => {
    const items = [
        {
            id: 5,
            invoice: 3,
            order: 2,
            description: 'This is the item description',
            quantity: 2,
            list_price: 13.99,
            discount_rate: 10,
            discount_amount: null,
            pre_tax_amount: null,
            tax_rate: null,
            tax_amount: null,
            total_price: null
        },
        {
            id: 6,
            invoice: 4,
            order: 3,
            description: 'This is another item description',
            quantity: 1,
            list_price: 23.99,
            discount_rate: null,
            discount_amount: null,
            pre_tax_amount: null,
            tax_rate: 20,
            tax_amount: null,
            total_price: null
        },
        {
            id: 7,
            invoice: 5,
            order: 4,
            description: 'This is yet another item description',
            quantity: 1,
            list_price: 10.0,
            discount_rate: null,
            discount_amount: null,
            pre_tax_amount: null,
            tax_rate: 20,
            tax_amount: null,
            total_price: 12.0
        }
    ];
    it('isNum should only return true when passed a number', () => {
        expect(calc.isNum(3)).toBe(true);
        expect(calc.isNum(3.5)).toBe(true);
        expect(calc.isNum('3.5')).toBe(false);
        expect(calc.isNum('3.x')).toBe(false);
        expect(calc.isNum('test')).toBe(false);
        expect(calc.isNum(null)).toBe(false);
        expect(calc.isNum()).toBe(false);
        expect(calc.isNum({})).toBe(false);
    });

    it('getTotal should take an array of items and return the sum of the totals for each item, calculated or otherwise', () => {
        expect(calc.getTotal(items, 'list_price')).toBe(65.97);
    });

    it('list_price should take an item and return the list_price calculated from the discount_rate and pre_tax_amount', () => {
        const goodItem = {
            discount_rate: 10,
            pre_tax_amount: 45.5
        };
        const badItem = {
            discount_rate: 10
        };
        expect(calc.list_price(goodItem)).toBe(50.05);
        expect(calc.list_price(badItem)).toBe(false);
    });

    it('discount_rate should take an item and return the discount_rate calculated from the list_price and pre_tax_amount', () => {
        const goodItem = {
            list_price: 10,
            pre_tax_amount: 9
        };
        const badItem = {
            list_price: 10
        };
        expect(calc.discount_rate(goodItem)).toBe(0.1);
        expect(calc.discount_rate(badItem)).toBe(false);
    });

    it('pre_tax_amount should take an item and return the pre_tax_amount calculated from the list_price and discount_rate', () => {
        const goodItem = {
            list_price: 10,
            discount_rate: 10
        };
        const noDiscount = {
            list_price: 10
        };
        const badItem = {
            discount_rate: 10
        };
        expect(calc.pre_tax_amount(goodItem)).toBe(9);
        expect(calc.pre_tax_amount(noDiscount)).toBe(10);
        expect(calc.pre_tax_amount(badItem)).toBe(false);
    });

    it('total_price should take an item and return the total_price calculated from the pre_tax_amount and tax_rate OR tax_amount', () => {
        const goodTaxRate = {
            pre_tax_amount: 9,
            tax_rate: 10,
            quantity: 1
        };
        const goodTaxAmount = {
            pre_tax_amount: 9,
            tax_amount: 1,
            quantity: 1
        };
        const noTax = {
            pre_tax_amount: 9,
            quantity: 1
        };
        expect(calc.total_price(goodTaxRate)).toBe(9.9);
        expect(calc.total_price(goodTaxAmount)).toBe(10);
        expect(calc.total_price(noTax)).toBe(9);
    });
});
