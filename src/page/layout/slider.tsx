import React, { useState } from 'react';
import { ExpandOutlined } from '@ant-design/icons';
import { lineSetting, rectSetting } from '../../settings/action';
import { InputNumber, Form, Input, Tooltip } from 'antd';
import logo from '../../assets/logo.png';
import Guide from '../../components/guide';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useUpdateEffect } from 'ahooks';
import { replace } from '../../store/dashboard';
import { SvgType } from '../../store/type';
import styles from './index.module.less';

type Position = 'top' | 'bottom' | 'middle';
const setting = {
  line: lineSetting,
  rect: rectSetting,
};

const Slider: React.FC = () => {
  const [svgType, setSvgType] = useState<SvgType>('line');
  const currentSetting = (setting as any)[svgType];

  const position = currentSetting['position'];
  const geometric = currentSetting['geometric'];
  const notGeometric = currentSetting['notGeometric'];
  const [positionForm] = Form.useForm();
  const [geometricForm] = Form.useForm();
  const [notGeometricForm] = Form.useForm();
  const { currentForm } = useSelector((state: RootState) => state.tool);
  const { render } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();

  useUpdateEffect(() => {
    // 当左侧变化时，需要进行通知视图更新；
    const { attrs, type } = currentForm;
    if (type === 'line') {
      // 说明当前变化的是line类型
      const { y1, x1 } = attrs as App.Line;
      setSvgType('line');
      notGeometricForm.setFieldsValue(attrs);
      geometricForm.setFieldsValue(attrs);
      positionForm.setFieldsValue({ top: y1, left: x1 });
      return;
    }
    // 说明当前变化的是rect类型
    const { x, y } = attrs as App.Rect;
    setSvgType('rect');
    notGeometricForm.setFieldsValue(attrs);
    geometricForm.setFieldsValue(attrs);
    positionForm.setFieldsValue({ top: y, left: x });
  }, [currentForm]);

  const formChange = (_form: any, position: Position) => {
    const geoForm = geometricForm.getFieldsValue();
    const notGeoForm = notGeometricForm.getFieldsValue();
    const { top, left } = positionForm.getFieldsValue();
    const { id, type } = currentForm;
    const index = render.findIndex((item) => item.id === id);
    const { attrs } = render.find((item) => item.id === id) || { attrs: null };

    const linetop = () => {
      const { x1, y1, x2, y2 } = attrs as App.Line; // 原来的
      const chax2 = left - x1,
        chay2 = top - y1;
      dispatch(
        replace({
          index,
          item: {
            id,
            type,
            attrs: {
              ...notGeoForm,
              x1: left,
              y1: top,
              x2: x2 + chax2,
              y2: y2 + chay2,
            },
          },
        })
      );
    };

    const linebottom = () => {
      dispatch(
        replace({
          index,
          item: {
            id,
            type,
            attrs: { ...geoForm, ...notGeoForm },
          },
        })
      );
    };

    const recttop = () => {
      dispatch(
        replace({
          index,
          item: {
            id,
            type,
            attrs: { ...geoForm, ...notGeoForm, x: left, y: top },
          },
        })
      );
    };

    const rectbottom = () => {
      dispatch(
        replace({
          index,
          item: {
            id,
            type,
            attrs: { ...geoForm, ...notGeoForm },
          },
        })
      );
    };

    type === 'line'
      ? position === 'top'
        ? linetop()
        : linebottom()
      : position === 'top'
      ? recttop()
      : rectbottom();
  };

  return (
    <div className={styles.slider}>
      <div className={styles.logo}>
        <ExpandOutlined style={{ fontSize: '20px' }} />
        <span className={styles.title}>
          <img className={styles['logo-img']} src={logo} />
        </span>
      </div>
      <div className={styles['action-area']}>
        {currentSetting && render.length ? (
          <>
            <div className={styles.card}>
              <Form
                size="small"
                labelCol={{ span: 8, offset: 0 }}
                colon={false}
                onValuesChange={(form) => formChange(form, 'top')}
                form={positionForm}
              >
                {Object.keys(position).map((key) => {
                  // Number((props as any)[key])
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={<div className={styles.label}>{key}</div>}
                    >
                      <InputNumber max={1000} min={0}></InputNumber>
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
            <div className={styles.card}>
              <Form
                size="small"
                labelCol={{ span: 8, offset: 0 }}
                colon={false}
                onValuesChange={(form) => formChange(form, 'middle')}
                form={geometricForm}
              >
                {Object.keys(geometric).map((key) => {
                  // Number((props as any)[key])
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={<div className={styles.label}>{key}</div>}
                    >
                      <InputNumber max={1000} min={0}></InputNumber>
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
            <div className={styles.card}>
              <Form
                size="small"
                labelCol={{ span: 8, offset: 0 }}
                colon={false}
                onChange={(form) => formChange(form, 'bottom')}
                form={notGeometricForm}
              >
                {Object.keys(notGeometric).map((key) => {
                  return (
                    <Form.Item
                      key={key}
                      name={key}
                      label={
                        <Tooltip title={key}>
                          <div className={styles.label}>{key}</div>
                        </Tooltip>
                      }
                    >
                      <Input size="small" type="color"></Input>
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
          </>
        ) : null}
        {/* 操作导航 */}
        {!render.length && <Guide />}
      </div>
    </div>
  );
};

export default Slider;
