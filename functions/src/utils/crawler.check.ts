import dayjs from 'dayjs'
import * as Crawler from './crawler'
import { deepEqual } from 'assert'

async function run() {
  const result = await Crawler.crawl('potato4d')
  deepEqual(result, {
    date: dayjs().format('YYYY/MM/DD'),
    count: 13
  })
}

run()
