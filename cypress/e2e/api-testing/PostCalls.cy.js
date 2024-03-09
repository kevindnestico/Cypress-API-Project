describe('api testing', () => {
    
    it('Hard Code Json Object', () => {

        const requestBody = {

            tourist_name: "Mike",
            tourist_email: "kevintest123456@gmail.com",
            tourist_location: "Rome"
        }

        cy.request({

            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: requestBody

        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq("Mike")
            expect(response.body.tourist_email).to.eq("kevintest123456@gmail.com")
            expect(response.body.tourist_location).to.eq("Rome")

        })

    });

    it('Dinamically Generating Json Object', () => {

        const name = Math.random().toString(5).substring(2);
        const email = `${name+"@gmail.com"}`

        const requestBody = {
            
            tourist_name: name,
            tourist_email: email,
            tourist_location: "Rome"

        }

        cy.request({

            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: requestBody

        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(response.body.tourist_location).to.eq("Rome")

        })

    });

    it.only('Using Fixture', () => {

        cy.fixture('tourist').then((data)=>{
            const requestBody = data;

            cy.request({

                method: 'POST',
                url: 'http://restapi.adequateshop.com/api/Tourist',
                body: requestBody
            })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
                expect(response.body).has.property('tourist_email',requestBody.tourist_email)
                
            })

        })

    });

});