const handlers = {};

$(() => {

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage);
//      this.get('#/home', handlers.getWelcomePage);
        this.get('#/home', handlers.getComingSoonPage);

        this.get('#/', handlers.getWelcomePage);

        this.post('#/register', handlers.registerUser);
        this.post('#/login', handlers.loginUser);
        this.get('#/logout', handlers.logout);

        this.get('#/editor', handlers.getEditor);
        this.post('#/entry/create', handlers.createEntry);
        this.post('#/entry/delete', handlers.deleteEntry);
        this.post('#/checkout', handlers.checkout);

        this.get('#/overview', handlers.getMyReceipts);
        this.get('#/receipt/detail/:id', handlers.getReceiptById);
    });

    app.run();
});