handlers.getMyPCs = async function (ctx) {
    const userId = sessionStorage.getItem('userId');

    pcService.getMyPCs(userId)
        .then((allPCs) => {
            allPCs.forEach((e) => {
                e.date = new Date(e._kmd.ect).toDateString();
            })
            ctx.username = sessionStorage.getItem('username');
            ctx.pcs = allPCs;
            ctx.totalAll = 0;

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

handlers.getPCById = function (ctx) {
    const receiptId = ctx.params.id;

    entriesService.getAllByPCId(receiptId)
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


