const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
   it('can create a subdocument', async () => {
      const joe = await new User({
         name: 'Joe',
         posts: [{ title: 'Post 1' }, { title: 'Post 2' }],
      });
      await joe.save();

      const user = await User.findOne({ name: 'Joe' });

      assert(!!user.posts.find(({ title }) => title === 'Post 1'));
   });

   it('can add subdocuments to an existing record', async () => {
      const joe = await new User({
         name: 'Joe',
         posts: [],
      });
      await joe.save();

      await (async () => {
         const user = await User.findOne({ name: 'Joe' });
         user.posts.push({ title: 'New Post' });

         await user.save();
      })();

      await (async () => {
         const user = await User.findOne({ name: 'Joe' });

         assert(!!user.posts.find(({ title }) => title === 'New Post'));
      })();
   });

   it('can remove subdocuments to an existing record', async () => {
      const joe = await new User({
         name: 'Joe',
         posts: [{ name: 'New Post' }],
      });
      await joe.save();

      await (async () => {
         const user = await User.findOne({ name: 'Joe' });
         user.posts[0].remove();

         await user.save();
      })();

      await (async () => {
         const user = await User.findOne({ name: 'Joe' });

         assert(user.posts.length === 0);
      })();
   });
});
