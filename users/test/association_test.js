const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blog_post');

describe('Associations', () => {
   let joe, blogPost, comment;

   beforeEach(async () => {
      joe = new User({ name: 'Joe' });
      blogPost = new BlogPost({ title: 'Post 1', content: 'Content 1' });
      comment = new Comment({ content: 'Comment 1' });

      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      comment.user = joe;

      await Promise.all([joe.save(), blogPost.save(), comment.save()]);
   });

   it('saves a relation between a user and a blogPost', async () => {
      const user = await User.findOne({ name: 'Joe' }).populate('blogPosts');
      assert(user.blogPosts[0].title === 'Post 1');
   });

   it('saves a full relation graph', async () => {
      const user = await User.findOne({ name: 'Joe' }).populate({
         path: 'blogPosts',
         populate: {
            path: 'comments',
            model: 'comment',
            populate: {
               path: 'user',
               model: 'user',
            },
         },
      });
      assert(user.blogPosts[0].comments[0].user.name === 'Joe');
   });
});
