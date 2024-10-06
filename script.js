let items = [];
let grandTotal = 0;
let customerDetailsAdded = false;

function addItem() {
    const customerName = document.getElementById("customerName").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const itemName = document.getElementById("itemName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    if (!customerName || !customerEmail) {
        alert("Please enter customer name and email.");
        return;
    }

    if (itemName && quantity > 0 && price > 0) {
        const itemTotal = quantity * price;

        items.push({
            name: itemName,
            quantity: quantity,
            price: price,
            total: itemTotal
        });

        if (!customerDetailsAdded) {
            document.getElementById("displayCustomerName").innerText = customerName;
            document.getElementById("displayCustomerEmail").innerText = customerEmail;
            customerDetailsAdded = true;
        }

        document.getElementById("itemName").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("price").value = "";

        updateInvoiceTable();
    } else {
        alert("Please enter valid item details.");
    }
}

function updateInvoiceTable() {
    const invoiceItems = document.getElementById("invoiceItems");
    invoiceItems.innerHTML = ""; // Clear previous entries
    grandTotal = 0;

    items.forEach((item) => {
        const newRow = `<tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${item.total.toFixed(2)}</td>
                        </tr>`;
        invoiceItems.insertAdjacentHTML('beforeend', newRow);

        grandTotal += item.total;
    });

    document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}

function generateInvoice() {
    if (items.length === 0) {
        alert("No items added. Please add items to generate an invoice.");
        return;
    }

    const salesTax = grandTotal * 0.10;
    const totalWithTax = grandTotal + salesTax;

    const invoiceDetails = `
        <div class="card p-4 mt-4" id="generatedInvoice">
            <h4>Invoice</h4>
            <p><strong>Customer Name:</strong> ${document.getElementById("displayCustomerName").innerText}</p>
            <p><strong>Customer Email:</strong> ${document.getElementById("displayCustomerEmail").innerText}</p>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price (PKR)</th>
                            <th>Total (PKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${item.total.toFixed(2)}</td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <h5 class="text-right">Subtotal: ${grandTotal.toFixed(2)} PKR</h5>
            <h5 class="text-right">Sales Tax (10%): ${salesTax.toFixed(2)} PKR</h5>
            <h5 class="text-right">Grand Total: ${totalWithTax.toFixed(2)} PKR</h5>
            <button class="btn btn-success mt-3" onclick="printInvoice()">Print Invoice</button>
        </div>`;

    document.getElementById("invoiceContainer").innerHTML = invoiceDetails;

    clearFormFields();
    items = [];
    updateInvoiceTable(); 
    customerDetailsAdded = false;
    grandTotal = 0;
}

function clearFormFields() {
    document.getElementById("customerName").value = "";
    document.getElementById("customerEmail").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}

function printInvoice() {
    const invoiceContent = document.getElementById("generatedInvoice").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = invoiceContent;
    window.print();

    document.body.innerHTML = originalContent;
    location.reload(); 
}