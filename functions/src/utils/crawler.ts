import axios from 'axios'
import cheerio from 'cheerio'
import { ContributionLog } from '../types'

export async function crawl(GitHubID: string): Promise<ContributionLog> {
  let data: string
  try {
    const response = await axios.get(
      `https://github.com/${GitHubID}`
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
    url: `https://github.com/${GitHubID}`,
    length: $('g rect').length ,
    lastRect
  })
  return {
    date: lastRect.attribs['data-date'].replace(/-/g, '/'),
    count: ~~lastRect.attribs['data-count']
  }
}
