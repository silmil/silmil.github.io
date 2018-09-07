handlers.getMyReceipts = async function (ctx) {
    const userId = sessionStorage.getItem('userId');

    receiptService.getMyReceipts(userId)
        .then((allReceipts) => {
            allReceipts.forEach((e) => {
                e.date = new Date(e._kmd.ect).toDateString();
            })
            ctx.username = sessionStorage.getItem('username');
            ctx.receipts = allReceipts;
            ctx.totalAll = allReceipts
                .map((e) => +e.total)
                .reduce((a, b) => a + b);

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                receipt: './templates/receipt/receipt.hbs',
            }).then(function () {
                this.partial('./templates/receipt/all-receipts.hbs')
            })
        })
        .catch(notify.handleError)
}

handlers.getReceiptById = function (ctx) {
    const receiptId = ctx.params.id;

    entriesService.getAllByReceiptId(receiptId)
        .then((entries) => {

            entries.forEach((e) => {
                e.subtotal = (e.price * e.quantity).toFixed(2);
            });

            ctx.username = sessionStorage.getItem('username');
            ctx.entries = entries;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                entry: './templates/receipt/entry-details.hbs',
            }).then(function () {
                this.partial('./templates/receipt/receipt-details.hbs')
            })
        })
        .catch(notify.handleError)
}


