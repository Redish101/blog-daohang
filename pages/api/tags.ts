import { getTags } from '@/utils/api'
import wrapper from '@/utils/backend/api'

import DB from '@/utils/backend/db';

export default wrapper<typeof getTags>(
    async (args, req, res) => {
        if (req.method === 'GET') {
            return await DB.getTags({})
        } else {
            return { "success": false, "message": "Method not allowed" }
        }
    }
)



