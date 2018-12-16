import { createConnection } from 'typeorm'
import { User } from './entity/User'
;(async () => {
  try {
    const connection = await createConnection()
    console.log(connection)
    const user = await User.findOne({
      where: { id: 1 },
      relations: ['contributions']
    })
    console.log(user)
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
