import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LandingPage from "../views/LandingPage.vue";
import {
  LANDING_PAGE_ROUTE,
  NEW_SCENARIO_ROUTE,
  ORBAT_CHART_ROUTE,
  SCENARIO_ROUTE,
  STORY_MODE_ROUTE,
} from "@/router/names";

const MainView = () => import("../modules/scenarioeditor/MainView.vue");
const NewScenarioView = () => import("../modules/scenarioeditor/NewScenarioView.vue");
const StoryModeView = () => import("../modules/storymode/StoryModeView.vue");
const OrbatChartView = () => import("../modules/charteditor/OrbatChartView.vue");
const ComponentsTestView = () => import("../views/ComponentsTestView.vue");
const GeoTestView = () => import("../views/GeoTestView.vue");
const StoreTestView = () => import("../views/StoreTestViewWrapper.vue");

const routes = [
  {
    path: "/scenario",
    name: SCENARIO_ROUTE,
    component: MainView,
    beforeEnter: (to, from) => {
      NProgress.start();
    },
  },
  {
    path: "/newscenario",
    name: NEW_SCENARIO_ROUTE,
    component: NewScenarioView,
    beforeEnter: (to, from) => {
      NProgress.start();
    },
  },
  {
    path: "/storymode",
    name: STORY_MODE_ROUTE,
    component: StoryModeView,
    beforeEnter: (to, from) => {
      NProgress.start();
    },
  },
  {
    path: "/chart",
    name: ORBAT_CHART_ROUTE,
    component: OrbatChartView,
    beforeEnter: (to, from) => {
      NProgress.start();
    },
  },
  {
    path: "/testcomponents",
    component: ComponentsTestView,
  },
  {
    path: "/geotests",
    component: GeoTestView,
  },
  { path: "/teststore", component: StoreTestView },

  { path: "/", name: LANDING_PAGE_ROUTE, component: LandingPage },
] as RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});