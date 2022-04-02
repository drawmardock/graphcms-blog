import Head from 'next/head';
import { getPostBySlug, getPostPathBySlug, getCategories, getRecentPosts } from '../../lib/data';
import Link from 'next/link';

export async function getStaticProps({ params }) {
  const { categoriesConnection } = await getCategories();
  const { post } = await getPostBySlug(params.slug);
  const { postsConnection } = await getRecentPosts();

  return {
    props: {
      post,
      categoriesConnection,
      postsConnection,
    },
  };
}

export async function getStaticPaths() {
  
  const { posts } = await getPostPathBySlug();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function PostsSlug({ post, categoriesConnection, postsConnection }) {
 return <div>
   <Head>
      <title> Posts Title goes here</title>
      </Head>

<div className="container mx-auto py-4 px-10 mb-8">
        <div className="grid grid-cols-1  lg:grid-cols-8 gap-10">
          <div className="col-span-1 md:col-span-4 lg:col-span-6 py-8">
          <h1 className="font-bold tracking-wide text-gray-700 text-center text-6xl mx-6" >{post.title}</h1>
          <p className="font-bold tracking-wide text-gray-500 text-base text-justify py-6" >{post.excerpt}</p>
          <h2 className="font-bold tracking-wide text-gray-500 text-justify text-xl " >{post.createdAt}</h2>
          <img src={post.featuredImage.url} alt="" className="object-top object-cover rounded-t-lg lg:rounded-lg py-6" />
  <p className="text-gray-500 text-base text-justify py-6">{post.content.text}</p>
          </div>
          <div className="bg-gray-300 border rounded-lg  col-span-2 md:col-span-4 lg:col-span-2">
            <div className="border rounded-lg relative lg:sticky top-2">
    {categoriesConnection?.edges.map((type) => (
        <Link key={type.node.slug} href={`/posts/category/${type.node.slug}`} passHref>
         <div className="lg:sticky group overflow-hidden relative top-2" >
       <div className="bg-white px-6 py-6">
           <div className="w-full object-cover group-hover:scale-105  border rounded-lg bg-gray-300 group cursor-pointer overflow-hidden font-bold text-2xl mb-2 text-gray-600 text-center"> 
         <h2>{type.node.name}</h2> 
          </div>
          </div>
          </div>
        </Link>
      ))}
      </div>
      <div className="block cursor-pointer">
      {postsConnection?.edges.map((widgets) => (
        <Link key={widgets.node.slug} href={`/posts/${widgets.node.slug}`} passHref>
         <div className="group overflow-hidden relative top-2" >
         <img width="20" height="20" className="h-60 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={widgets.node.featuredImage.url} alt={`${widgets.node.title} Cover Image`}/>
       <div className="bg-white px-6 py-4">
           <div className="w-full object-cover group-hover:scale-105   group cursor-pointer overflow-hidden font-bold text-2xl mb-2 text-gray-600 text-center"> 
         <h2>{widgets.node.title}</h2> 
          </div>
          </div>
          </div>
        </Link>
      ))}
      </div>
      </div>
        </div>
      </div>

</div>
}
 