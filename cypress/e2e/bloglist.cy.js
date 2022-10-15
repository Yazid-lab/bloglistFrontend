// NOTE: 5.17
describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { username: 'yazid', name: 'yazid bougrine', password: 'pass' }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('login', function () {
    it('succeds when credentials are correct', function () {
      cy.get('#username').type('yazid')
      cy.get('#password').type('pass')
      cy.get('button').click()
      cy.contains('yazid bougrine')
    })
    it('fails when crendentials are wrong', function () {
      cy.get('#username').type('yazid')
      cy.get('#password').type('wrongpass')
      cy.get('button').click()
      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('yazid')
      cy.get('#password').type('pass')
      cy.get('button').click()
    })
    it('a blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('blog by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('google.com')
      cy.get('#submit-blog').click()
      cy.contains('blog by cypress')
    })
    describe('when a blog is created', function () {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('#title').type('blog by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('google.com')
        cy.get('#submit-blog').click()
        cy.contains('blog by cypress')
      })
      it('blog can be liked',function(){
        cy.get('#toggle-visibility').click()
        cy.get('#like-button').click()
      })
    })
  })
})
