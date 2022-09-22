import { GetArticlesAPIModel, GetArticlesUIModel } from "./models/getArticles";



export let getArticlesAPIModeltoUIModel = (result:GetArticlesAPIModel)=>{
  
  let newResult:GetArticlesUIModel = new  GetArticlesUIModel({
    pageNum: result.data.pageNum,
    pageSize: result.data.pageSize,
    totalItems: result.data.totalItems,
    totalPages: result.data.totalPages,    
  });
  newResult.data = result.data.data.map((item)=>{

    return {
      title:item.title,
      imgSrc:item.urlToImage,
      imgAlt:item.title, 
      desc:item.description,    
      href:item.url  
    }
  })
 

  return newResult
}