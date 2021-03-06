import { getStepStyles } from './stepStyles'
import { getCourseFileContents } from '../utils/files'
import { getLangFromFile } from '../utils/languageFromFile'
import { getCourseSlug } from '../utils/slugs'

const getCodes = (course: string, step: string, answersheetPaths: string[]) =>
  answersheetPaths.map((cheatFile) => ({
    language: getLangFromFile(cheatFile),
    name: cheatFile,
    code: getCourseFileContents(course, `answersheet/files/${cheatFile}`, step),
  }))

export default (course: string, step: string, answersheetPaths: string[]) => {
  return `
  ${getStepStyles()}
  [block:code]
  ${JSON.stringify({
    codes: getCodes(course, step, answersheetPaths),
  })}
  [/block]

  [block:html]
  ${JSON.stringify({
    html: `<div id="back-button">
            <i class="fa fa-angle-left"></i>
            <a id="back-link" href="/learning/docs/${getCourseSlug(
              course,
              step
            )}">voltar</a>
          </div>`,
  })}
  [/block]
`
}
