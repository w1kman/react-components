const fs = require('fs')

export default function inputFilesInDirectory(
  directory,
  includeExtensions = ['.js', '.ts', '.jsx', '.tsx'],
  excludeExtensions = []
) {
  let fileNames = []
  const dirs = fs.readdirSync(directory)

  dirs.forEach((dir) => {
    const childDir = `${directory}/${dir}`

    if (fs.lstatSync(childDir).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...inputFilesInDirectory(childDir, includeExtensions, excludeExtensions),
      ]

      return
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      includeExtensions.some((include) => dir.endsWith(include))
    ) {
      fileNames.push(childDir)
    }
  })

  return fileNames
}
