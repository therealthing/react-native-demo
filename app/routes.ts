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
type RouteName = keyof StackParamList;

export const routes: {
  name: RouteName;
  component: React.FC<any>;
  initialParams?: StackParamList[keyof StackParamList];
}[] = [
  {
    name: 'Blog' as RouteName,
    component: BlogScreen,
    initialParams: {postId: undefined},
  },
  {
    name: 'Dashboard' as RouteName,
    component: DashboardScreen,
  },
];
