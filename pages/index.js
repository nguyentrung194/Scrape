import Layout from './components/MyLayout';
import cheerio from 'cheerio';
import axios from 'axios';
import React, {useState} from 'react';
import Post from './components/Post'

const layoutStyle = {
  marginTop: 10,
  marginBottom: 20,
  padding: 20,
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
     muctim: {
        url: 'https://vn.indeed.com/jobs?q=&l=Vi%E1%BB%87t+Nam&start=',
        parent: '#resultsCol',
        child: '.jobsearch-SerpJobCard',
        title: 'a[data-tn-element="jobTitle"]',
        company: '.company',
        address: '.accessible-contrast-color-location',
        summary: '.summary'
     },
    },
 }



// client side
export default ({titleResult, companyResult, addressResult, summaryResult}) => {
  console.log({titleResult, companyResult, addressResult, summaryResult})
  let key=0;
  return (
    <Layout content={
      <div style={layoutStyle}>
        <h2>Result</h2>
        
      </div>
    }/>  
  )
}

// server side
export async function getServerSideProps(){
  let couter = 10
  let title = [];
  let company = [];
  let address = [];
  let summary = [];
  let summaryTemp = [];
  while(couter<100){
    let URL = myConfig.webSite.muctim.url+{couter}
    let resFromUrl = await axios.get(URL)
    let $ = cheerio.load(resFromUrl.data)
    
    $(myConfig.webSite.muctim.parent)
    .find(myConfig.webSite.muctim.child)
    .each((i, el)=>{
      $(el).find(myConfig.webSite.muctim.title)
      .each((i, el)=>title.push(($(el).text())))
      $(el).find(myConfig.webSite.muctim.company)
      .each((i, el)=>company.push($(el).text()))
      $(el).find(myConfig.webSite.muctim.address)
      .each((i, el)=>address.push($(el).text()))
      $(el).find(myConfig.webSite.muctim.summary)
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
  const titleResult = title.filter(n => n != undefined )
  const addressResult = address.filter(n => n != undefined )
  const companyResult = company.filter(n => n != undefined )
  const summaryResult = summary.filter(n => n != undefined )

  return {
    props: {
      titleResult: titleResult,
      companyResult: companyResult,
      addressResult: addressResult,
      summaryResult: summaryResult,
    }
  }  

}