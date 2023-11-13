import styled from 'styled-components/native';
import {metrics, colors, spacing} from './constants';

/* typography */
export const Title = styled.Text`
  font-size: ${metrics.large}px;
  text-align: center;
  padding-left: 4px;
  color: ${colors.dark};
`;

/* Sidebar */
export const SidebarContainer = styled.View`
  flex-grow: 1;
`;

/* Layout */
export const ScreenContainer = styled.View`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  min-height: 100%;
  margin: 1%;
  display: flex;
  background: ${colors.light3};
`;

export const ArticleContainer = styled.View`
  background-color: white;
  margin-top: ${spacing.xxsmall}%;
  margin-bottom: ${spacing.xxsmall}%;
  margin-left: ${spacing.xsmall}%;
  margin-right: ${spacing.xsmall}%;
  padding: ${spacing.xxsmall}%;
`;
