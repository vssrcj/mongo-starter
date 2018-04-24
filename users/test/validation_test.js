const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
   it('requires a user name', () => {
      const user = new User({ name: undefined });
      const validationResult = user.validateSync();
      const { message } = validationResult.errors.name;

      assert(message === 'Name is required.');
   });

   it('requires a user\'s name longer than 2 characters', () => {
      const user = new User({ name: 'Al' });
      const { message } = user.validateSync().errors.name;

      assert(message === 'Name must be longer than 2 characters.');
   });

   it('disallows invalid records form being saved', async () => {
      const user = new User({ name: 'Al' });
      try {
         await user.save();
      } catch (result) {
         const { message } = result.errors.name;
         assert(message === 'Name must be longer than 2 characters.');
      }
   })
});
