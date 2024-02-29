export const navBarLinks: any = [
  {
    name: "Home",
    link: "/",
    submenu: false,
    arrange: "row",
  },
  {
    name: "About us",
    link: "/",
    submenu: true,
    arrange: "row",
    sublinks: [
      {
        Head: "Summary",
        submenu: false,
      },
      {
        Head: "More options",
        submenu: true,
        sublinks: [
          { name: "Mission and vision", link: "/" },
          { name: "Division", link: "/" },
          { name: "Membership", link: "/" },
        ],
      },
      {
        Head: "Our team",
        submenu: false,
      },
    ],
  },
  {
    name: "Training center",
    link: "/",
    submenu: false,
    arrange: "row",
  },
  {
    name: "MKI programs",
    link: "/",
    submenu: false,
    arrange: "row",
  },
  {
    name: "MKI community",
    link: "/",
    submenu: false,
    arrange: "row",
  },
  {
    name: "Contact us",
    link: "/",
    submenu: false,
    arrange: "row",
  },
  {
    name: "Account",
    link: "/",
    submenu: true,
    arrange: "column",
    sublinks: [
      {
        Head: "Sign in",
        submenu: false,
      },
      {
        Head: "Sign up",
        submenu: false,
      },
    ],
  },
];
