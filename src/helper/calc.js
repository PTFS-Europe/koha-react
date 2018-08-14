const isNum = val => !isNaN(parseFloat(val));

const getTotal = (items, column) => {
    let total = 0;
    items.forEach(i => {
        if (i.hasOwnProperty(column) && i[column] > 0) {
            total += parseFloat(i[column]);
        }
    });
    return total;
};
const list_price = item => {
    if (isNum(item.discount_rate) && isNum(item.pre_tax_amount)) {
        return item.pre_tax_amount * ((100 + item.discount_rate) / 100);
    } else {
        return false;
    }
};
const discount_rate = item => {
    if (isNum(item.list_price) && isNum(item.pre_tax_amount)) {
        return (1 - item.pre_tax_amount / item.list_price) * 100;
    } else {
        return false;
    }
};
const pre_tax_amount = item => {
    if (isNum(item.list_price) && isNum(item.discount_rate)) {
        return item.list_price - item.list_price * (item.discount_rate / 100);
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
    if (isNum(item.tax_rate) && isNum(item.tax_amount)) {
        return false;
    } else if (isNum(amount) && isNum(item.tax_rate)) {
        return amount * ((item.tax_rate + 100) / 100);
    } else if (isNum(amount) && isNum(item.tax_amount)) {
        return amount + item.tax_amount;
    } else {
        return amount;
    }
};
export default {
    getTotal,
    list_price,
    discount_rate,
    pre_tax_amount,
    total_price
};
