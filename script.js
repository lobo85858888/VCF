document.addEventListener('DOMContentLoaded', function () {
    const savePaymentButton = document.getElementById('savePaymentButton');
    const saveWeaponButton = document.getElementById('saveWeaponButton');

    if (savePaymentButton) {
        savePaymentButton.addEventListener('click', function () {
            const recipient = document.getElementById('recipient').value.trim();
            const amount = document.getElementById('amount').value.trim();
            if (recipient !== "" && amount !== "") {
                saveTransaction({ type: 'payment', recipient, amount });
                document.getElementById('recipient').value = '';
                document.getElementById('amount').value = '';
            }
        });
    }

    if (saveWeaponButton) {
        saveWeaponButton.addEventListener('click', function () {
            const weapon = document.getElementById('weapon').value.trim();
            const quantity = document.getElementById('quantity').value.trim();
            const recipient = document.getElementById('recipient').value.trim();
            if (weapon !== "" && quantity !== "" && recipient !== "") {
                saveTransaction({ type: 'weapon', weapon, quantity, recipient });
                document.getElementById('weapon').value = '';
                document.getElementById('quantity').value = '';
                document.getElementById('recipient').value = '';
            }
        });
    }

    loadTransactions();

    function saveTransaction(transaction) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
    }

    function loadTransactions() {
        displayTransactions();
    }

    function displayTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        if (!transactionsList) return;

        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactionsList.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const transactionItem = document.createElement('li');
            if (transaction.type === 'payment') {
                transactionItem.textContent = `Pago de ${transaction.amount} a ${transaction.recipient}`;
            } else if (transaction.type === 'weapon') {
                transactionItem.textContent = `Arma: ${transaction.weapon}, Cantidad: ${transaction.quantity}, Destinatario: ${transaction.recipient}`;
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function () {
                deleteTransaction(index);
            });

            transactionItem.appendChild(deleteButton);
            transactionsList.appendChild(transactionItem);
        });
    }

    function deleteTransaction(index) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
    }
});
