export default function getPaginationData(page:string){
   const pageNum=Math.max(Number(page) || 1);
    return {
        skip:(pageNum-1)*10,
        take:10,
    }
}