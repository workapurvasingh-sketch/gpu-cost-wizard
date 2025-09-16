import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testBlogInsert() {
  try {
    console.log('Testing blog post insertion...')

    // First get a category ID
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('id')
      .limit(1)

    if (catError || !categories || categories.length === 0) {
      console.error('Error fetching category:', catError)
      return
    }

    const categoryId = categories[0].id
    console.log('Using category ID:', categoryId)

    // Try to insert a new blog post
    const { data: postData, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: 'Test Post - RLS Policy Check',
        slug: 'test-post-rls-policy-check-' + Date.now(),
        excerpt: 'Testing if RLS policies allow post creation',
        content: '<p>This is a test post to verify that RLS policies are working correctly.</p>',
        author_id: null,
        category_id: categoryId,
        status: 'published',
        published_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting post:', insertError)
      return
    }

    console.log('✅ Successfully inserted blog post!')
    console.log('Post ID:', postData.id)
    console.log('Post Title:', postData.title)

    // Clean up - delete the test post
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postData.id)

    if (deleteError) {
      console.error('Error deleting test post:', deleteError)
    } else {
      console.log('✅ Test post cleaned up successfully')
    }

  } catch (error) {
    console.error('Test failed:', error)
  }
}

testBlogInsert()
