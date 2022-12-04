import React from "react"
import { render } from "react-dom"
// eslint-disable-next-line no-restricted-imports
import { DocsApp } from ".."
import * as GettingStartedDocs from "./GettingStarted.docs"
import * as HomeDocs from "./Home.docs"

render(
  <DocsApp
    logo="Codedocs"
    icon="book"
    copyright="Copyright © 2022 Outerframe, Inc"
    docs={[HomeDocs, GettingStartedDocs]}
    githubUrl="https://github.com/ambic-js/codedocs"
  />,
  document.getElementById("root")
)
