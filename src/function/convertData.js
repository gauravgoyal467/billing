const convertData = (updatedProduct) => {
    // Step 1: Calculate rate after applying initial discount
    let MRP = updatedProduct.MRP;
    const discountAmount = (MRP * updatedProduct.less) / 100;
    let rate = updatedProduct.MRP - discountAmount;
    let undaulteredRate = rate;

    // Step 2: Adjust rate based on the deal (if valid)
    if (updatedProduct.Deal && updatedProduct.Deal !== "NODEAL" && updatedProduct.Deal !== "") {
        const dealParts = updatedProduct.Deal.split("+");
        if (dealParts.length === 2) {
            const dealQuantity = parseInt(dealParts[0].trim());
            const dealFree = parseInt(dealParts[1].trim());
            if (dealQuantity > 0) {
                rate = rate * dealQuantity / (dealQuantity + dealFree);
            }
        }
    }
    //Step 3:Adjust disc if any ex 2%
    const discValue = parseFloat(updatedProduct.Disc);
    const discountRateAmount = (rate * discValue) / 100;
    let discRate = rate - discountRateAmount;


    // Step 4: Add tax (let's say 6%)
    const taxPercentage = Number(updatedProduct.Tax) || 6;
    const taxAmount = (discRate * taxPercentage) / 100;
    let netRate = discRate + taxAmount;

    // Step 5: Calculate total cost (quantity * tax-adjusted rate)
    const finalAmount = updatedProduct.quantity * netRate;

    // Step 6: Return the final product data with all changes
    const finalProduct = {
        ...updatedProduct,
        MRP: Number(MRP).toFixed(2),
        Rate: undaulteredRate.toFixed(2),
        netRate: netRate.toFixed(2),
        Tax: `${taxPercentage.toFixed(2)}%`,
        Disc: `${discValue.toFixed(2)}%`,
        finalAmount: finalAmount.toFixed(2),
    };

    return finalProduct;
};

export default convertData;