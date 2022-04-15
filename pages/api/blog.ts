import { Blog, shouldString, Result } from "@/utils";
import wrapper from "@/utils/backend/api";

import DB from "@/utils/backend/db";

export default wrapper<((_:{token?:string, id?:string, blog?: Blog})=>Promise<Result<any>>)>(
  async (args, req) => {
  

    if (req.method === "PUT" && !!args.blog) {
      return await DB.addBlog({
        blog: args.blog as Blog 
      });
    } else if (req.method === 'POST' && !!args.id && !!args.blog) {
      if (!(await DB.getUser({ token: shouldString(args.token) })).success) {
        return { "success": false, "message": "You do not has permission" };
      }
      
      return await DB.updateBlog({
        id: shouldString(args.id),
        blog: args.blog as Blog,
      });
    } else if (req.method === 'DELETE' && args.id) { 
      if (!(await DB.getUser({ token: shouldString(args.token) })).success) {
        return { "success": false, "message": "You do not has permission" };
      }
      
      return await DB.deleteBlog({
        id: shouldString(args.id )
      });
    }
    
    return { "success": false, "message": "Method not allowed" };
  }
);


