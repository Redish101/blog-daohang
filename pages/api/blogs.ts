import { Result, Blog, shouldNumber, shouldString, shouldArraySplit } from '@/utils'
import { getBlogs } from '@/utils/api'
import wrapper from '@/utils/backend/api'

import DB from '@/utils/backend/db';

export default wrapper<typeof getBlogs>(
    async (args, req, res) => {
        if (req.method === 'GET') {
            return await DB.getBlogs({
                search: shouldString(args.search, ""),
                tags: shouldArraySplit(args.tags),
                offset: shouldNumber(args.offset, 0),
                size: shouldNumber(args.size, -1),
            })
        } else {
            return { "success": false, "message": "Method not allowed" } as Result<Blog[]>
        }
    }
)



