const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
   let joe;

   beforeEach(async () => {
      joe = new User({ name: 'Joe' });
      await joe.save();
   });

   afterEach(async () => {
      const user = await User.findOne({ name: 'Joe' })
      assert(user === null);
   });

   it('model instance remove', async () => {
      await joe.remove();
   });

   it('class method remove', async () => {
      // Remove a bunch of records with some given criteria
      await User.remove({ name: 'Joe' });
   });

   it('class method findOneAndRemove', async () => {
      await User.findOneAndRemove({ name: 'Joe' });
   });

   it('class method findByIdAndRemove', async () => {
      await User.findByIdAndRemove(joe._id);
   });
});
