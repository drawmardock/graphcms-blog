import { getFooterAbout } from "../lib/data";


export async function getStaticProps() {
  

  const { infos } = await getFooterAbout();


 

  


  return {
    props: {
     infos,
    },
  };
}



function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 mx-auto px-10 py-6">
<div className=" gap-6 md:gap-6 md:p-6 border-gray-100 rounded overflow-hidden ">
<div>
<h2 className="text-white text-2xl"></h2>

</div>
<div>

<p className="text-white text-center">
@drawmardock 2022
</p>
</div>

<div>
<p > </p>
</div>
</div>

</div>
  )
}

export default Footer