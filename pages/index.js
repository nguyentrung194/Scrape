import Layout from './components/MyLayout';
import cheerio from 'cheerio';
import axios from 'axios';
import React, {useState} from 'react';
import Post from './components/Post'


const layoutStyle = {
  marginTop: '10',
  marginBottom: '20',
  padding: '20',
  border: '1px solid #DDD'
};
const postStyle={
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '5px',
  width: '200px',
};

/****
 * Bat dau config
 */

 const myConfig = {
  webSite: {
    url: 'https://vn.indeed.com/jobs?q=&l=Vi%E1%BB%87t+Nam&start=',
    parent: '#resultsCol',
    child: '.jobsearch-SerpJobCard',
    title: 'a[data-tn-element="jobTitle"]',
    company: '.company',
    address: '.accessible-contrast-color-location',
    summary: '.summary'
  },
}



// client side
function Page({titleResult, addressResult, companyResult, summaryResult}) {
  console.log({titleResult, addressResult, companyResult, summaryResult});
  return (
    <div>
        <Layout content={
          <div>
            <Post titleResult={titleResult} addressResult={addressResult} companyResult={companyResult} summaryResult={summaryResult} />
          </div>
        } />
    </div>
  );
}

export default Page
// server side
export async function getServerSideProps(){
  let couter = 10
  let title = [];
  let company = [];
  let address = [];
  let summary = [];
  let summaryTemp = [];
  while(couter<20){
    let URL = myConfig.webSite.url+{couter}
    let resFromUrl = await axios.get(URL)
    let $ = cheerio.load(resFromUrl.data)
    // đống code để lấy dữ liệu
    $(myConfig.webSite.parent)
    .find(myConfig.webSite.child)
    .each((i, el)=>{
      $(el).find(myConfig.webSite.title)
      .each((i, el)=>title.push(($(el).text())))
      $(el).find(myConfig.webSite.company)
      .each((i, el)=>company.push($(el).text()))
      $(el).find(myConfig.webSite.address)
      .each((i, el)=>address.push($(el).text()))
      $(el).find(myConfig.webSite.summary)
      .each((i, el)=>{
        $(el).find('li').each((i, el)=>{
          summaryTemp.push($(el).text())
        })
        summary.push(summaryTemp)
        summaryTemp = []
      })
    })
    couter+=10
  }
  // Duyệt qua các mảng
  const titleResult = title.filter(n => n != undefined )
  const addressResult = address.filter(n => n != undefined )
  const companyResult = company.filter(n => n != undefined )
  const summaryResult = summary.filter(n => n != undefined )
  

  return {
    props: {
      titleResult: titleResult,
      addressResult: addressResult,
      companyResult: companyResult,
      summaryResult: summaryResult
    }
  }  

}