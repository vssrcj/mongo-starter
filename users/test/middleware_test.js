const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/user');
const BlogPost = require('../src/blog_post');

describe('Middleware', () => {
   let joe, blogPost;

   beforeEach(async () => {
      joe = new User({ name: 'Joe' });
      blogPost = new BlogPost({ title: 'Post 1', content: 'Content 1' });
  
      joe.blogPosts.push(blogPost);
   
      await Promise.all([joe.save(), blogPost.save()]);
   });

   it('users clean up dangling blogposts on remove', async () => {
      await joe.remove();
      const count = await BlogPost.count();
      assert(count === 0);
   });
});
