import { shouldString, shouldArraySplit, shouldNumber } from '@/utils'
import { getRandomBlogs } from '@/utils/api'
import wrapper from '@/utils/backend/api'

import DB from '@/utils/backend/db';

export default wrapper<typeof getRandomBlogs>(
    async (args, req, res) => {
        if (req.method === 'GET') {
            const result = await DB.getBlogs({
                search: shouldString(args.search, ""),
                tags: shouldArraySplit(args.tags),
            })
            if (!!result.success && !!result.data) {
                var arr = result.data;
                arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
                return { success: true, data: arr.slice(0, shouldNumber(args.n, 10)) };
            }
            return result;
        } else {
            return { "success": false, "message": "Method not allowed" }
        }
    }
)

