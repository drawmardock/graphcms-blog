import { request, gql } from 'graphql-request';
import { api_endpoint } from '../constants/index';



export const getFirstPosts = async ()=> {
    
    const query = gql
      `query GetFirstPost {
        posts(orderBy: createdAt_ASC, first: 1) {
          slug
          title
          excerpt
          featuredImage {
            url
          }
          createdAt
          }
      }    
    `
    ;
    return await request(api_endpoint, query)
    }

    export const getRecentPosts = async ()=> {
    
      const query = gql
        `query GetRecentPosts {
          postsConnection(orderBy: createdAt_DESC, first:3) {
            edges {
              node {
                title
                slug
                excerpt
                featuredImage {
                  url
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
        }    
      `
      ;
      return await request(api_endpoint, query)
      }

    export const getPostBySlug = async (slug) => {
      const query = gql
      `query PostPageQuery($slug: String!){
        post(where: {slug: $slug}) {
          title
          excerpt
          createdAt
          featuredImage {
            url
          }
          content {
            text
          }
        }
      
      }`;
      const variables = {
        slug,
      };
        return await request(api_endpoint, query, variables) 
  }





    export const getPostPathBySlug = async () => {
      const query = gql
      `query GetPathSlugPost{
        posts {
          slug
          title
        }
      }`;
        return await request(api_endpoint, query) 
  }



    export const getCategories = async () => {
        const query = gql
        `query GetCategories {
            categoriesConnection(orderBy: createdAt_DESC) {
            edges {
              node {
                name
                slug
              }
            }
          }
        }`;
          return await request(api_endpoint, query) 
    }




   export const getCategoriesBySlug = async (slug) => {
      const query = gql
      `query GetCategoriesBySlug($slug: String = "") {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            node {
              title
              slug
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }`;
      const variables = {
        slug,
      };
        return await request(api_endpoint, query, variables) 
  }
  
  export const getSameCategoriesPost = async (slug) => {
    const query = gql
    `query GetSameCategoriesPost($slug: String = "") {
      posts(where: {categories_some: {slug: $slug}}, orderBy: createdAt_DESC, first: 3) {
        title
    slug
    excerpt
    featuredImage {
      url
    }
    categories {
      name
      slug
    }
      }
    }`;
    const variables = {
      slug,
    };
      return await request(api_endpoint, query, variables) 
}


  export const getCategorisPathBySlug = async () => {
    const query = gql
    `query GetPathSlugCategories{
      categories(where: {post_some: {}}) {
        name
        slug
        post {
          slug
          title
        }
      }
    }`;
      return await request(api_endpoint, query) 
}

export const getFooterAbout = async ()=> {
    
  const query = gql
    `query GetFooterAbout {
      infos {
        logo
        {
          url
        }
        title
        description
      }
    }    
  `
  ;
  return await request(api_endpoint, query)
  }