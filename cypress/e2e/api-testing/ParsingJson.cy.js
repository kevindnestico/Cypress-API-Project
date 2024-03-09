describe('API Testing', () => {
    
    it('Parsing JSON', () => {

        let totalprice = 0;

        cy.request({
            method: 'POST',
            url: "https://fakestoreapi.com/products",
            qs: { limit: 5 }
        }).then((response) => {
            expect(response.status).to.eql(200);

            const jsonData = response.body;

            if (Array.isArray(jsonData)) {
                jsonData.forEach(element => {
                    totalprice = totalprice + element.price;
                });

                expect(totalprice).to.be.greaterThan(0);
            } else {
                // Manejar el caso en el que no hay productos o la estructura es diferente
                cy.log('No se encontraron productos o la estructura es diferente.');
            }
        });
        
    });

});
