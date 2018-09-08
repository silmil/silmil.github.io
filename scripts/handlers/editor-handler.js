handlers.getEditor = async function (ctx) {
    try {
        const userId = sessionStorage.getItem('userId');
        let [ receipt ] = await pcService.getActive(userId);

        if (!receipt) {
            receipt = await receiptService.create();
        }

        let entries = await entriesService.getAllByPCId(receipt._id);

        if(entries.length > 0){
            entries.forEach((e) => {
                e.subtotal = (e.quantity * e.price).toFixed(2);
            });

            ctx.total = entries
                .map((e) => +e.subtotal)
                .reduce((a, b) => a + b);

            ctx.productCount = entries.length;
        } else {
            ctx.total = 0;
            ctx.productCount = 0;
        }

        ctx.entries = entries;
        ctx.receiptId = receipt._id;
        ctx.username = sessionStorage.getItem('username');

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            entry: './templates/editor/entry.hbs',
            entryForm: './templates/forms/entry-form.hbs',
            checkoutForm: './templates/forms/checkout-form.hbs'
        }).then(function () {
            this.partial('./templates/editor/editor-page.hbs')
        })

    } catch (err){
        notify.handleError(err)
    }
};

handlers.createEntry = function (ctx) {

    const receiptId = ctx.params.receiptId;
    const type = ctx.params.type;
    const quantity = ctx.params.quantity;
    const price = ctx.params.price;

    if(type.length === 0){
        notify.showError("Product name must be filled")
    } else if (isNaN(quantity) || quantity.length === 0) {
        notify.showError("Quantity must be  number")
    } else if (isNaN(+price) || price.length === 0) {
        notify.showError("Price must be  number")
    } else {
        entriesService.create(type, quantity, price, receiptId)
            .then(() => {
                notify.showInfo("Entry added");
                ctx.redirect('#/editor');
            })
            .catch(notify.handleError);
    }
};

handlers.deleteEntry = function (ctx) {
    const entryId = ctx.params.entryId;

    entriesService.remove(entryId)
        .then(() => {
            notify.showInfo("Entry Deleted");
            ctx.redirect('#/editor');
        })
        .catch(notify.handleError);
};

