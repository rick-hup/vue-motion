export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
}

export type SidebarNavItem = NavItem & {
  items: SidebarNavItem[]
}

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[]
}

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs/introduction',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/radix-vue/shadcn-vue',
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/introduction',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
        {
          title: 'components.json',
          href: '/docs/components-json',
          items: [],
        },
        {
          title: 'Theming',
          href: '/docs/theming',
          items: [],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
          items: [],
        },
        {
          title: 'Typography',
          href: '/docs/typography',
          items: [],
        },
        {
          title: 'Figma',
          href: '/docs/figma',
          items: [],
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
          items: [],
        },
        {
          title: 'About',
          href: '/docs/about',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'Vite',
          href: '/docs/installation/vite',
          items: [],
        },
        {
          title: 'Nuxt',
          href: '/docs/installation/nuxt',
          items: [],
        },
        {
          title: 'Astro',
          href: '/docs/installation/astro',
          items: [],
        },
        {
          title: 'Laravel',
          href: '/docs/installation/laravel',
          items: [],
        },
      ],
    },
  ],
}

interface Example {
  name: string
  href: string
  label?: string
  code: string
}
export const examples: Example[] = [
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/cards',
  },
  // {
  // name: "Tasks",
  // href: "/examples/tasks",
  // label: "New",
  // code: "https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/tasks"
  // },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/playground',
  },
  {
    name: 'Music',
    href: '/examples/music',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/authentication',
  },
  {
    name: 'Forms',
    href: '/examples/forms',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/routes/examples/forms',
  },
]
