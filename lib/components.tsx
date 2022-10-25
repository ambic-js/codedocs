import type * as Defaults from "./Defaults"
export * as Defaults from "./Defaults"
import { type Link } from "react-router-dom"
import type { ReactNode } from "react"
import { useContext } from "react"
import React, { createContext } from "react"

type LinkComponent = React.FC<{ to: Parameters<typeof Link>[0]["to"] }>

export type Container = React.FC<{ children: React.ReactNode }>

export type Components = {
  GlobalStyles: React.FC<Record<string, never>>
  Header: React.FC<Defaults.HeaderProps>
  Columns: Container
  LeftColumn: Container
  MainColumn: Container
  NavLink: LinkComponent
  NavList: Container
  NavHeading: Container
  NavItem: Container
  PageHeading: Container
  DemoHeading: Container
  Link: LinkComponent
  Code: Container
  Pre: Container
}

type ComponentContextProviderProps = {
  Components: Components
  children: ReactNode
}

const ComponentContext = createContext<Components>({} as Components)

export const ComponentContextProvider = ({
  Components,
  children,
}: ComponentContextProviderProps) => (
  <ComponentContext.Provider value={Components}>
    <Components.GlobalStyles />
    {children}
  </ComponentContext.Provider>
)

export const useComponents = () => {
  const Components = useContext(ComponentContext)
  if (!Components.Link) {
    throw new Error(
      "Cannot use useComponents outside of a ComponentContextProvider"
    )
  }
  return Components
}