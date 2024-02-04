import IConvertAllResult from "@/utils/server/i-convert-all-result";

export default interface IConvertAllApiResult{
    targetRootDirectory : string;
    sourceRootDirectory : string;
    convertRecursivelyToWebPResult : IConvertAllResult; 
}