import DashboardScreen from '../app/screens/DashboardScreen';
import BlogScreen from '../app/screens/BlogScreen';

export type StackParamList = {
  Dashboard: {};
  Blog: {
    postId: number | undefined;
    title?: string;
    body?: string;
  };
};

export const routes = [
  {name: 'Blog', component: BlogScreen, initialParams: {postId: undefined}},
  {
    name: 'Dashboard',
    component: DashboardScreen,
  },
];
