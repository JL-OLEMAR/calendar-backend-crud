import * as mongoose from 'mongoose'

const connectionBD = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN)

    console.log('DB Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error when initialzing the DB')
  }
}

export { connectionBD }
