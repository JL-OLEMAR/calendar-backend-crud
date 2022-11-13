import moment from 'moment'

const isDate = (value) => {
  if (!value) return false

  const date = moment(value)

  return date.isValid()
}

export { isDate }
