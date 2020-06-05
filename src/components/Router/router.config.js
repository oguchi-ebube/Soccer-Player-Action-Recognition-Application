import LoadableComponent from "../loadable";

export const appRouters = [
  {
    path: "/",
    name: "index",
    title: "",
    component: LoadableComponent(() =>
      import("../../components/Layout/AppLayout")
    ),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: "/home",
    name: "HomePage",
    title: "HomePage",
    component: LoadableComponent(() => import("../../scenes/home")),
    isLayout: false,
    showInMenu: false,
  },
];

export const routers = [...appRouters];
