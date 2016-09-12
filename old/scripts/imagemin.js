import Imagemin from "imagemin"
import { join } from "path"

const distDir = join(__dirname, "../dist/")

new Imagemin()
  .src(distDir + "**/*.{gif,jpg,png}")
  .dest(distDir)
  .use(Imagemin.jpegtran({ progressive: true }))
  .use(Imagemin.optipng({ optimizationLevel: 3 }))
  .use(Imagemin.gifsicle({ interlaced: true }))
  .run((err, files) => {
    console.log("Optimized files: " + files.length)
    if (err) {
      console.error(err)
    }
  })
