declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module 'mockjs';

declare namespace App {
  type Line = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    stroke: string;
  };

  type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    rx: number;
    ry: number;
  };
}
