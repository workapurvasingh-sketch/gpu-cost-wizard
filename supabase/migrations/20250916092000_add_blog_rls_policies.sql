-- Add RLS policies for blog post creation and management

-- Allow authenticated users to insert blog posts
CREATE POLICY "Allow authenticated users to insert blog posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow anonymous users to insert blog posts (for development)
CREATE POLICY "Allow anonymous users to insert blog posts" ON public.blog_posts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update their own blog posts
CREATE POLICY "Allow authenticated users to update blog posts" ON public.blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blog posts
CREATE POLICY "Allow authenticated users to delete blog posts" ON public.blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Allow authenticated users to read all blog posts (including drafts)
CREATE POLICY "Allow authenticated users to read all blog posts" ON public.blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage blog categories
CREATE POLICY "Allow authenticated users to manage categories" ON public.blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage blog tags
CREATE POLICY "Allow authenticated users to manage tags" ON public.blog_tags
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage blog post tags
CREATE POLICY "Allow authenticated users to manage post tags" ON public.blog_post_tags
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to manage blog post tags (for development)
CREATE POLICY "Allow anonymous users to manage post tags" ON public.blog_post_tags
  FOR ALL USING (true);

-- Allow authenticated users to manage comments
CREATE POLICY "Allow authenticated users to manage comments" ON public.blog_comments
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow anyone to insert comments (for public commenting)
CREATE POLICY "Allow public comment insertion" ON public.blog_comments
  FOR INSERT WITH CHECK (true);
