// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApGshIyzDs65kdUOM8pFC6I3wbRWHdI2g",
    authDomain: "verdugo-crime-family.firebaseapp.com",
    projectId: "verdugo-crime-family",
    storageBucket: "verdugo-crime-family.appspot.com",
    messagingSenderId: "998047686059",
    appId: "1:998047686059:web:fc090dcf2b91fa1df206ee",
    measurementId: "G-BCGD9KGS8G"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

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
        const transactionRef = database.ref('transactions/' + Date.now());
        transactionRef.set(transaction)
            .then(() => console.log('Transacción guardada con éxito'))
            .catch((error) => console.error('Error al guardar transacción:', error));
    }

    function loadTransactions() {
        const transactionsRef = database.ref('transactions/');
        transactionsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            displayTransactions(data);
        });
    }

    function displayTransactions(data) {
        const transactionsList = document.getElementById('transactionsList');
        if (!transactionsList) return;

        transactionsList.innerHTML = '';
        for (let id in data) {
            const transaction = data[id];
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
                deleteTransaction(id);
            });

            transactionItem.appendChild(deleteButton);
            transactionsList.appendChild(transactionItem);
        }
    }

    function deleteTransaction(id) {
        const transactionRef = database.ref('transactions/' + id);
        transactionRef.remove()
            .then(() => console.log('Transacción eliminada con éxito'))
            .catch((error) => console.error('Error al eliminar transacción:', error));
    }
});
