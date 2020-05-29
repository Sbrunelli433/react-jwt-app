var expect = require('chai').expect;
var axios = require('axios');

describe('users', function() {
  
  it('should respond with an array of users at GET /api/users', function() {
    axios.get('http://localhost:4000/api/users')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
      });
  });

}); 