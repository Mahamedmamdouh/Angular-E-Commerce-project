export interface Cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id?:number,
  quantity?: number,
  productId?:number ,
  userId:number
}
