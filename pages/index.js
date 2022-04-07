import Link from 'next/link';
import Head from 'next/head';
import { request } from 'graphql-request';
import { getFirstPosts, getCategories } from '../lib/data';
import { api_endpoint } from '../constants/index';
import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';


const fetchData = (endpoint, query, variables) =>
  request(endpoint, query, variables);


export async function getStaticProps() {
  

  const { posts } = await getFirstPosts();

  const { categoriesConnection } = await getCategories();

 

  const data = await fetchData(
    api_endpoint,
    `
    query getPaginatedBlog {
      postsConnection(orderBy: updatedAt_DESC) {
        edges {
          node {
            id
            excerpt
            slug
            title
            featuredImage {
              url
            }
          }
        }
        pageInfo {
        hasNextPage
        hasPreviousPage
        pageSize
        }
      }
    }
`
  );


  return {
    props: {
      postsConnection: data,
      posts,
      categoriesConnection,
    },
  };
}


export default function Home({  postsConnection, posts, categoriesConnection }) {

  const [skip, setSkip] = useState(0);
  const { data, error } = useSWR(
    [
      api_endpoint,
      `    query getPaginatedBlog($skip: Int) {
        postsConnection(orderBy: updatedAt_DESC, first: 6, skip: $skip) {
          edges {
            node {
              id
              excerpt
              slug
              title
              featuredImage {
                url
              }
            }
          }
          pageInfo {
          hasNextPage
          hasPreviousPage
         }
        }
      }
  `,
      skip
    ],
    (endpoint, query) => fetchData(endpoint, query, { skip }),
    { initialData: postsConnection, revalidateOnFocus: true }
    );


return <div className="">
    <Head>
      <title> Title goes here</title>
      </Head>
      
      <div className="container mx-auto py-3 px-10 mb-8">
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-10">
<div className="col-span-2 md:col-span-4 lg:col-span-6">
{posts.map((items) => (
    <Link key={items.slug} href={`/posts/${items.slug}`} passHref>
     <div className="border rounded-lg bg-white group cursor-pointer overflow-hidden" >
      <Image 
      className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
      src={items.featuredImage.url} width={800}
      height={450}
      layout="responsive"
       alt={`${items.title} 
       Cover Image`}/>
   <div className="px-6 py-4">
       <div className="font-bold text-xl mb-2 text-gray text-justify"> 
     <h2 className="text-justify text-gray-700 text-2xl">{items.title}</h2> 
      <p className="text-gray-500 text-base text-justify py-1">{items.excerpt}</p> 
      </div> 
      </div>
      </div>
    </Link>
  ))}
  </div>
  <div className="bg-gray-200 border rounded-lg col-span-2 md:col-span-4 lg:col-span-2">
            <div className="border rounded-lg relative  lg:sticky top-2">
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
      </div>
  </div>
  </div>
 

  
<div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen py-2  mx-auto px-10 mb-1 ">
<div className="grid grid-cols-1 container sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 p-2 md:p-6 border-gray-100 rounded overflow-hidden shadow-lg">
{data?.postsConnection?.edges.map((post) => (
    <Link key={post.node.slug} href={`/posts/${post.node.slug}`} passHref>
     <div className="border bg-white rounded-lg group cursor-pointer overflow-hidden
     " >
     <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
      src={post.node.featuredImage.url} alt={`${post.node.title} Cover Image`}/>
   <div className="px-6 py-4">
       <div className="font-bold text-xl mb-2 text-gray text-justify"> 
     <h2 className="text-justify text-gray-700 text-2xl">{post.node.title}</h2> 
      <p className="text-gray-500 text-base text-justify py-1">{post.node.excerpt}</p> 
      </div> 
      </div>
      </div>
    </Link>
  ))}
  </div>
    <div className="flex space-x-5 justify-center items-center mt-10">
            <div >       
            
              <button  
              className="bg-white w-20 text-purple-800 px-3 py-1 rounded-md disabled:bg-gray-400 disabled:text-gray-800"                   
              disabled={!data?.postsConnection?.pageInfo?.hasPreviousPage}
                onClick={() => {
                  setSkip(skip - 6);
                }} >
                Previous
              </button>
              </div>  
            <div>
              <button
               className="bg-white w-20 text-purple-800 px-3 py-1 rounded-md disabled:bg-gray-400 disabled:text-gray-800"
              disabled={!data?.postsConnection?.pageInfo?.hasNextPage}
                onClick={() => {
                  setSkip(skip + 6);
                }} >
                Next
              </button>

            </div>

          
          {error && <div>Failed to load</div>}
      
      </div>   

    </div>



  
  </div>
}

