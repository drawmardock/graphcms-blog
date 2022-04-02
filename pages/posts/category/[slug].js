import Link from 'next/link';
import Head from 'next/head';
import {getCategoriesBySlug, getCategorisPathBySlug, getSameCategoriesPost, getCategories} from "../../../lib/data"



export async function getStaticProps({ params }) {
  const { postsConnection } = await getCategoriesBySlug(params.slug);
  const { posts } = await getSameCategoriesPost(params.slug);
  const { categoriesConnection } = await getCategories();
  return {
    props: {
      postsConnection,
      categoriesConnection,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { categories } = await getCategorisPathBySlug();

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function PostsSlug({ postsConnection, categoriesConnection, posts }) {

    return  <div>
         <Head>
      <title> Category Title goes here</title>
      </Head>
     <div className="container mx-auto py-5 px-10 shadow-lg">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-10">
    <div className="col-span-2 md:col-span-4 lg:col-span-6 ">
     {postsConnection?.edges.map((post) => (
        <Link key={post.node.slug} href={`/posts/${post.node.slug}`} passHref>
         <div className="border rounded-lg bg-white group cursor-pointer overflow-hidden mb-8">
          <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={post.node.featuredImage.url} alt={`${post.node.title} Cover Image`}/>
       <div className="px-6 py-6">
           <div className="font-bold text-2xl mb-2 text-gray text-justify"> 
         <h2 className="text-gray-700 ">{post.node.title}</h2> 
          <p className="text-gray-500 text-base text-justify py-1">{post.node.excerpt}</p> 
          </div> 
          </div>
          </div>
        </Link>
      ))}
     
      </div>
      <div className="bg-gray-300 border rounded-lg  col-span-2 md:col-span-4 lg:col-span-2">
            <div className="border rounded-lg relative lg:sticky top-2">
    {categoriesConnection?.edges.map((type) => (
        <Link key={type.node.slug} href={`/posts/category/${type.node.slug}`} passHref>
         <div className=" group overflow-hidden relative top-2" >
       <div className="bg-white px-6 py-4">
           <div className=" object-cover group-hover:scale-105  border rounded-lg bg-gray-300 group cursor-pointer overflow-hidden font-bold text-2xl mb-2 text-gray-600 text-center"> 
         <h2>{type.node.name}</h2> 
          </div>
          </div>
          </div>
        </Link>
      ))}
      
      </div>
      <div className="block cursor-pointer">
      {posts.map((widgets) => (
        <Link key={widgets.slug} href={`/posts/${widgets.slug}`} passHref>
         <div className="group overflow-hidden relative top-2" >
         <img width="20" height="20" className="h-60 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={widgets.featuredImage.url} alt={`${widgets.title} Cover Image`}/>
       <div className="bg-white px-6 py-4">
           <div className="w-full object-cover group-hover:scale-105   group cursor-pointer overflow-hidden font-bold text-2xl mb-2 text-gray-600 text-center"> 
         <h2>{widgets.title}</h2> 
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
 