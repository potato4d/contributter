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
  const lastRect: any = $('g rect')[$('g rect').length - 1]
  if (!lastRect || !lastRect.attribs) {
    throw new Error('missing element')
  }
  const contributionText = lastRect.children[0].data.split(' contributions')[0]
  const contributions = contributionText === 'No' ? 0 : contributionText;
  return {
    date: lastRect.attribs['data-date'].replace(/-/g, '/'),
    count: ~~contributions
  }
}
