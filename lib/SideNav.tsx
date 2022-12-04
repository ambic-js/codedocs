import React from "react"
import { useComponents } from "~/ComponentContext"
import { addSpaces } from "~/helpers"
import {
  isCategory,
  isSubCategory,
  type Category,
  type SubCategory,
  type Page,
  type Site,
  type SiteSection,
  isSite,
  isSiteSection,
} from "~/tree"

type SideNavProps = {
  categories: Category[]
  subCategories: SubCategory[]
  pages: Page[]
  currentCategory?: Category
  currentSubCategory?: SubCategory
  currentPage: Page
}

export const SideNav = ({
  categories,
  subCategories,
  pages,
  currentPage,
}: SideNavProps) => {
  const topLevelItems =
    categories.length > 0
      ? categories
      : subCategories.length > 0
      ? subCategories
      : pages

  return (
    <>
      <Nav item={currentPage.parent} />
      {topLevelItems.map((item) => (
        <Nav key={item.name} item={item} />
      ))}
    </>
  )
}

type NavItemProps = {
  item: Category | SubCategory | Page | Site | SiteSection
}

const Nav = ({ item }: NavItemProps) => {
  const Components = useComponents()

  if (isSite(item)) {
    return null
  }

  if (isCategory(item)) {
    return (
      <>
        <Components.NavHeading>{addSpaces(item.name)}</Components.NavHeading>
        <Components.NavList>
          {item.children.map((subCategory) => (
            <Nav key={subCategory.name} item={subCategory} />
          ))}
        </Components.NavList>
      </>
    )
  }

  if (isSubCategory(item)) {
    return (
      <>
        <Components.NavItem>{addSpaces(item.name)}</Components.NavItem>
        <Components.NavList>
          {item.children.map((page) => (
            <Nav key={page.name} item={page} />
          ))}
        </Components.NavList>
      </>
    )
  }

  if (isSiteSection(item)) {
    return <Components.NavHeading>{item.name}</Components.NavHeading>
  }

  return (
    <Components.NavItem>
      <Components.NavLink to={item.doc.props.path}>
        {addSpaces(item.name)}
      </Components.NavLink>
    </Components.NavItem>
  )
}
