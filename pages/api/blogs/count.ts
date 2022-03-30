import { shouldString, shouldArray, shouldNotUndefined, } from '@/utils'
import { getBlogCount } from '@/utils/api'
import wrapper from '@/utils/backend/api'

import DB from '@/utils/backend/db';

export default wrapper<typeof getBlogCount>(
    async (args, req, res) => {
        if (req.method === 'GET') {
            return await DB.getBlogCount({
                search: shouldString(args.search, ""),
                tags: shouldArray(shouldNotUndefined(args.tags, [])),
            })
        } else {
            return { "success": false, "message": "Method not allowed" }
        }
    }
)

