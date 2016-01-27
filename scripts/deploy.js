import ghPages from 'gh-pages'
import config from './config'

const paths = config.utils_paths

ghPages.publish(paths.dist(), {
  branch: 'master',
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/thangngoc89/thangngoc89.github.io.git',
}, (err) => {
  if (err) {
    console.error(err)
  }
})
