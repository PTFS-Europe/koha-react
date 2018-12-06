const isNum = val => typeof val === 'number' && !isNaN(parseFloat(val));

const getTotal = items => {
    return items.reduce((acc, curr) => {
        if (
            curr.hasOwnProperty('total_price') &&
            curr.total_price &&
            curr.total_price > 0
        ) {
            return acc + parseFloat(curr.total_price);
        } else {
            return acc + parseFloat(total_price(curr));
        }
    }, 0);
};
const list_price = item => {
    if (isNum(item.discount_rate) && isNum(item.pre_tax_amount)) {
        const nonFltAmt = item.pre_tax_amount * 100;
        const res = nonFltAmt * ((100 + item.discount_rate) / 100);
        return res / 100;
    } else {
        return false;
    }
};
const discount_rate = item => {
    if (isNum(item.list_price) && isNum(item.pre_tax_amount)) {
        const nonFltListPrice = item.list_price * 100;
        const nonFltPreTaxAmount = item.pre_tax_amount * 100;
        const res = 100 - (nonFltPreTaxAmount / nonFltListPrice) * 100;
        return res / 100;
    } else {
        return false;
    }
};
const pre_tax_amount = item => {
    if (isNum(item.list_price) && isNum(item.discount_rate)) {
        const nonFltListPrice = item.list_price * 100;
        const res =
            nonFltListPrice - (nonFltListPrice * item.discount_rate) / 100;
        return res / 100;
    } else if (isNum(item.list_price)) {
        return item.list_price;
    } else {
        return false;
    }
};
const total_price = item => {
    const amount =
        isNum(item.pre_tax_amount) && item.pre_tax_amount > 0
            ? item.pre_tax_amount
            : pre_tax_amount(item);
    const quantity = item.quantity ? item.quantity : 0;
    const useAmount = amount * 100;
    const useTaxAmount = item.tax_amount * 100;
    if (isNum(item.tax_rate) && isNum(item.tax_amount)) {
        return false;
    } else if (isNum(useAmount) && isNum(item.tax_rate)) {
        const res = useAmount * ((item.tax_rate + 100) / 100);
        return res * quantity / 100;
    } else if (isNum(useAmount) && isNum(useTaxAmount)) {
        const res = useAmount + useTaxAmount;
        return res * quantity / 100;
    } else {
        return amount;
    }
};
export default {
    isNum,
    getTotal,
    list_price,
    discount_rate,
    pre_tax_amount,
    total_price
};
