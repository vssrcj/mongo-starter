const assert = require('assert');
const User = require('../src/user');

describe('Updating record', () => {
   let joe;

   beforeEach(async () => {
      joe = new User({ name: 'Joe' });
      await joe.save();
   });

   afterEach(async () => {
      const users = await User.find();

      assert(users.length === 1);
      assert(users[0].name === 'Alex');
   });

   it('instance type using set n save', async () => {
      joe.set('name', 'Alex');
      await joe.save();
   });

   it('A model instance can update', async () => {
      await joe.update({ name: 'Alex' });
   });

   it('A model class can update', async () => {
      await User.update({ name: 'Joe' }, { name: 'Alex' });
   });

   it('A model class can update one record', async () => {
      await User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' });
   });

   it('A model class can find a record with an Id and update', async () => {
      await User.findByIdAndUpdate(joe._id, { name: 'Alex' });
   });
});

describe('Update record', () => {
   it('A user can have their postcount incremented by 1', async () => {
      const joe = new User({ name: 'Joe' });
      await joe.save();

      await User.update({ name: 'Joe' }, { $inc: { likes: 2 } });
      const user = await User.findOne({ name: 'Joe' });

      assert(user.likes === 2);
   });
})