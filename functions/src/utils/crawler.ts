import axios from 'axios'
import cheerio from 'cheerio'
import { ContributionLog } from '../types'

export async function crawl(TwitterID: string): Promise<ContributionLog> {
  let data: string
  try {
    const response = await axios.get(
      `https://github.com/users/${TwitterID}/contributions`
    )
    data = response.data
    if (!data) {
      return Promise.reject()
    }
  } catch (e) {
    return Promise.reject()
  }
  const $ = cheerio.load(data)
  const lastRect = $('rect')[$('rect').length - 1]
  return {
    date: lastRect.attribs['data-date'].replace(/-/g, '/'),
    count: ~~lastRect.attribs['data-count']
  }
}
