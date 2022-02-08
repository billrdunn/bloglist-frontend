describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test_user',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('user can login', function () {
    cy.contains('show login').click()
    cy.get('#username').type('test_user')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()
    cy.get('#alert')
      .should('contain', 'user test_user logged in')
    cy.get('#logout').click()
  })
  
  it('front page can be opened', function () {
    cy.contains('show login')
  })

  it('login form can be opened', function () {
    cy.contains('show login').click()
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.contains('cancel')
  })

  it('login fails with wrong username', function () {
    cy.contains('show login').click()
    cy.get('#username').type('wrong_user')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()
    cy.get('#alert')
    // .should('contain', 'Invalid credentials')
    //   .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'user test_user logged in')
  })
  
  it('login succeeds with correct credentials', function () {
    cy.contains('show login').click()
    cy.get('#username').type('test_user')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()
    cy.get('#alert')
    .should('contain', 'user test_user logged in')
    //   .and('have.css', 'color', 'rgb(0, 128, 0)')
    cy.get('html').should('not.contain', 'Invalid credentials')
    cy.get('#logout').click()
  })

  it('login fails with wrong password', function () {
    cy.contains('show login').click()
    cy.get('#username').type('test_user')
    cy.get('#password').type('password1234')
    cy.get('#login-button').click()
    cy.get('#alert')
    // .should('contain', 'Invalid credentials')
    cy.get('html').should('not.contain', 'user test_user logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test_user', password: 'password123' })
    })

    describe('after three new blogs are created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog created by cypress',
          author: 'cypress author',
          url: 'cypress url'
        })
        cy.createBlog({
          title: 'second blog created by cypress',
          author: 'cypress author',
          url: 'cypress url'
        })
        cy.createBlog({
          title: 'third blog created by cypress',
          author: 'cypress author',
          url: 'cypress url'
        })
        cy.contains('blog created by cypress')
        cy.contains('second blog created by cypress')
        cy.contains('third blog created by cypress')
      })
      it('the like button increases the like count of the second blog', function () {
        cy.contains('second blog')
          .parent().as('secondBlog')
          .find('button').as('theButton')

        cy.get('@theButton').click()

        cy.get('@secondBlog')
          .contains('like')
          .click()
        cy.get('@secondBlog')
          .contains('likes: 1')
      })
      it('the user who created a blog can delete it', function () {
        cy.contains('second blog')
          .parent().as('secondBlog')
          .find('button').click()

        cy.get('@secondBlog')
          .contains('remove').click()

        cy.get('html').should('not.contain', 'second blog')
      })
      it('the blog with the most likes is shown first', function () {
        cy.contains('second blog')
          .parent().as('secondBlog')
          .find('button').click()

        cy.get('@secondBlog')
          .contains('like').click()

        cy.get('.blogList').get('span')
          .should('contain', 'second blog')
          .should('not.contain', 'first blog')
          .should('not.contain', 'third blog')

      })
    })
  })
})