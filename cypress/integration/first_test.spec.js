///<reference types="Cypress"/>
describe('Our first suite',()=>{
    beforeEach('Login to the application page',()=>{
        cy.intercept('GET', '**/tags', {fixture:'tags.json'})
        cy.LoginToApplication()
    })
    //Check that we are logged in
    it ('should log in',()=>{
        cy.log('Yes! we are logged in')
        cy.get('div.home-page').should('contain', 'Your Feed')
    });

    it('Verify correct request and response when you create a new article', ()=>{
        cy.intercept('POST', '**/articles').as('postArticles')
        cy.contains('.nav-link', 'New Article').click();
        
        cy.get('form[novalidate]').within(()=>{
            cy.get('input').eq(0).type('Some Brand Spanking New Article');
            cy.get('input').eq(1).type('Cool Stuff');
            cy.get('textarea').eq(0).type('What do you mean in markdown?');
            cy.get('input').eq(2).type('cool stuff new awesome amazing')
            cy.get('button').should('contain', 'Publish Article').click();
        
        cy.wait('@postArticles')
        cy.get('@postArticles').then(xhr=>{
            console.log(xhr); 
            expect(xhr.request.body.article.description).to.equal('Cool Stuff');
            expect(xhr.response.statusCode).to.equal(200);
        });
        })
    });

    it ('Should have updated tags pulling from fixtures folder tags.json file',()=>{
        cy.get('.tag-list')
            .should('contain', 'Cypress')
            .and('contain', 'Automation')
            .and('contain', 'Testing')
    })

    it ('Verifies global feed likes count',()=>{
        // cy.intercept('GET', '**/articles/feed*', {"articles":[],"articlesCount":0})
        cy.intercept('GET', '**/articles*', {fixture:'articles.json'})
        cy.get('.col-md-9').contains('Global Feed').click();


        cy.get('.pull-xs-right button').then(likeButtons=>{
            // cy.wrap(likeButtons).eq(0).should('contain', '5');
            // cy.wrap(likeButtons).eq(1).should('contain', '5');
            // cy.wrap(likeButtons).eq(2).should('contain', '5')
            Array.from(likeButtons).forEach(iterator=>{
                expect(iterator).to.contain('5');
            });
        });

        cy.fixture('articles').then(file=>{
            const articleLink= file.articles[0].slug;
        cy.intercept('POST', '**/articles/'+articleLink+'/favorite', file);
    });
        cy.get('.pull-xs-right button').then(likeButtons=>{
            cy.wrap(likeButtons).eq(0).click();         
            cy.wrap(likeButtons).eq(0).should('contain', '6');
        });
    });
   
    it('Creates new article', ()=>{
            const bodyRequest=
            {
                "article": {
                    "tagList": [],
                    "title": "No No This IS The New Article",
                    "description": "Something",
                    "body": "No No No This is Cool"
                }
            }  
        
        cy.get('@token').then(token=>{
        cy.request({
                url: "https://conduit.productionready.io/api/articles/",
                headers: {'Authorization': 'Token '+token},
                   method: "POST",
                body: bodyRequest
                }).then(response=>{
                    expect(response.status).to.equal(200);
                });
        }); 
         });
    });