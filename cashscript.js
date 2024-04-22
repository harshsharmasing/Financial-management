document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const necessary = document.getElementById('necessary').checked;

    fetch('/add-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: date=${date}&category=${category}&amount=${amount}&necessary=${necessary}
    }).then(() => {
        document.getElementById('expense-form').reset ();
        fetchExpenses();
    });
});

function fetchExpenses() {
    fetch('/expenses')
        .then(response => response.json())
        .then(data => {
            let necessaryTotal = 0;
            let unnecessaryTotal = 0;
            data.forEach(expense => {
                if(expense.necessary) {
                    necessaryTotal += expense.amount;
                } else {
                    unnecessaryTotal += expense.amount;
                }
            });
            const summaryDiv = document.getElementById('expenses-summary');
            summaryDiv.innerHTML = <p>Total Necessary Expenses: INR ${necessaryTotal}</p><p>Total Unnecessary Expenses: INR ${unnecessaryTotal}</p>;
        });
}

fetchExpenses();