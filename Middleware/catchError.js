export function catchError(fn){
    return (req,res)=>{
        fn(req,res).catch(error=>{
            res.status(401).json({message:error});
        });
    }
}