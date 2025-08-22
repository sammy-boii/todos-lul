export const VALID_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'mail.com'
]

if (process.env.NODE_ENV === 'development') {
  VALID_DOMAINS.push('example.com')
}
