/**
 * 自定义hooks文件
 */
import { useEffect, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import { setDashBoardSize } from '../store/position';

export const useDashboardSize = (dashboard: RefObject<HTMLDivElement>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setDashBoardSize({
        width: dashboard.current!.offsetWidth,
        height: dashboard.current!.offsetHeight,
      })
    );
    window.addEventListener('resize', () => {
      dispatch(
        setDashBoardSize({
          width: dashboard.current!.offsetWidth,
          height: dashboard.current!.offsetHeight,
        })
      );
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);
};
