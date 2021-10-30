import axios from 'axios'
import cheerio from 'cheerio'
import { ContributionLog } from '../types'

export async function crawl(TwitterID: string): Promise<ContributionLog> {
  let data: string
  try {
    const response = await axios.get(
      `https://github.com/${TwitterID}`
    )
    data = response.data
    if (!data) {
      return Promise.reject()
    }
  } catch (e) {
    return Promise.reject()
  }
  const $ = cheerio.load(data)
  const lastRect = $('g rect')[$('g rect').length - 1]
  console.log({
    url: `https://github.com/${TwitterID}`,
    length: $('g rect').length ,
    lastRect
  })
  return {
    date: lastRect.attribs['data-date'].replace(/-/g, '/'),
    count: ~~lastRect.attribs['data-count']
  }
}
