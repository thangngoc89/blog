import ghPages from 'gh-pages'
import { join } from 'path'

const dist = join(__dirname, '../dist')

ghPages.publish(dist, {
  branch: 'master',
  repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/thangngoc89/thangngoc89.github.io.git',
}, (err) => {
  if (err) {
    console.error(err)
  }
})
