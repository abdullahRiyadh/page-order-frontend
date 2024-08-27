document.getElementById('orderForm').addEventListener('input', function() {
    // Product prices
    const productPrices = {
        product1: 100,
        product2: 200
    };

    // Get field values
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0; // Default to 0 if NaN
    const delivery = document.getElementById('delivery').value;

    // Calculate price
    let price = productPrices[product] ? productPrices[product] * quantity : 0;

    // Calculate delivery charge
    const deliveryCharge = delivery === 'inside' ? 80 : delivery === 'outside' ? 120 : 0;

    // Calculate total price
    const totalPrice = price + deliveryCharge;

    // Display bill
    if (product && quantity > 0 && delivery) {
        document.getElementById('bill').innerText = `প্রোডাক্ট মূল্য: ${price} টাকা\nডেলিভারি চার্জ: ${deliveryCharge} টাকা\nমোট মূল্য: ${totalPrice} টাকা`;
    } else {
        document.getElementById('bill').innerText = '';
    }
});

// Form submission handling
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get field values
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const address = document.getElementById('address').value.trim();
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0; // Default to 0 if NaN
    const delivery = document.getElementById('delivery').value;

    // Calculate price
    const productPrices = {
        product1: 100,
        product2: 200
    };
    let price = productPrices[product] ? productPrices[product] * quantity : 0;

    // Calculate delivery charge
    const deliveryCharge = delivery === 'inside' ? 80 : delivery === 'outside' ? 120 : 0;

    // Calculate total price
    const totalPrice = price + deliveryCharge;

    let errorMessage = '';

    // Validate fields
    if (!name) {
        errorMessage += 'নাম খালি রাখা যাবে না।\n';
    }

    if (!/^\d{11}$/.test(mobile)) {
        errorMessage += 'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হতে হবে।\n';
    }

    if (!address) {
        errorMessage += 'ঠিকানা খালি রাখা যাবে না।\n';
    }

    if (!product) {
        errorMessage += 'প্রোডাক্ট নির্বাচন করুন।\n';
    }

    if (!quantity || quantity < 1) {
        errorMessage += 'পরিমাণ একটি সংখ্যা হতে হবে এবং ১ বা তার বেশি হতে হবে।\n';
    }

    if (!delivery) {
        errorMessage += 'ডেলিভারি নির্বাচন করুন।\n';
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    // Prepare data for submission
    const orderData = {
        name: name,
        mobile: mobile,
        address: address,
        product: product,
        quantity: quantity,
        delivery: delivery,
        price: totalPrice // Ensure price is included
    };

    // Submit data to backend
    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('confirmation').style.display = 'block';
        setTimeout(() => {
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('orderForm').reset();
            document.getElementById('bill').innerText = '';
            window.location.reload();
        }, 5000); // Refresh the page after 5 seconds
    })
    .catch(error => console.error('Error:', error));
});
