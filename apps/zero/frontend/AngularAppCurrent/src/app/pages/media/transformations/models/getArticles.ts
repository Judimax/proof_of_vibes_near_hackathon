

export class GetArticlesAPIModel {
  constructor(params:Partial<GetArticlesAPIModel>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  code!:"OK" | "ERROR"
  data!:{
    data:Array<{
      author:string,
      content:string,
      description:string,
      publishedAt:string,
      source:{
        id:string,
        name:string
      },
      title:string, 
      url:string
      urlToImage:string
    }>,
    pageNum: number,
    pageSize: number,
    totalItems: number,
    totalPages: number    
  }
}

export class GetArticlesUIModel {
  constructor(params:Partial<GetArticlesUIModel>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  data!:Array<{
    title:string
    imgSrc:string
    imgAlt:string 
    desc:string,
    href:string
  }>
  pageNum!: number
  pageSize!: number
  totalItems!: number
  totalPages!: number    

}